// =====================================================
// CINEMATIC SPIRAL GALAXY — Performance-Optimised
// Uses offscreen pre-rendering so the spiral is drawn
// once and only ROTATED each frame via drawImage().
// =====================================================

(function initGalaxy() {

    // ── Main (visible) canvas ────────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.id = 'galaxyCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: 0;
        pointer-events: none;
        will-change: transform;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d', { alpha: true });

    // ── Offscreen canvas for the static galaxy texture ───────────────────────
    const offCanvas = document.createElement('canvas');
    const offCtx    = offCanvas.getContext('2d');

    let W, H, cx, cy, baseRadius;
    let galaxyBuilt = false;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        cx = W / 2;
        cy = H / 2;
        baseRadius = Math.min(W, H) * 0.44;

        // The offscreen canvas is square, sized to fit the full rotated galaxy
        const offSize = baseRadius * 2.4;
        offCanvas.width  = offSize;
        offCanvas.height = offSize;

        galaxyBuilt = false; // force rebuild on next frame
    }
    resize();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    }, { passive: true });

    // ── Scroll-speed tracking (passive, no layout thrash) ────────────────────
    let lastScrollY    = window.scrollY;
    let scrollVelocity = 0;
    let smoothVelocity = 0;

    window.addEventListener('scroll', () => {
        scrollVelocity = window.scrollY - lastScrollY;
        lastScrollY    = window.scrollY;
    }, { passive: true });

    // ── Rotation state ───────────────────────────────────────────────────────
    let angle = 0;

    // ── Background stars (cheap — just dots, no gradients per frame) ─────────
    const BG_STAR_COUNT = 700;
    let bgStars = [];

    function buildStars() {
        bgStars = Array.from({ length: BG_STAR_COUNT }, () => ({
            x:   Math.random() * W,
            y:   Math.random() * H,
            r:   Math.random() * 1.5 + 0.2,
            a:   Math.random() * 0.6 + 0.35,
            tw:  Math.random() * Math.PI * 2,
            tws: 0.008 + Math.random() * 0.02,
            bright: Math.random() > 0.93,
        }));
    }
    buildStars();
    window.addEventListener('resize', buildStars, { passive: true });

    // ── Build galaxy texture on offscreen canvas (called once) ───────────────
    function buildGalaxyTexture() {
        const oc  = offCtx;
        const OS  = offCanvas.width;   // offscreen size (square)
        const ocx = OS / 2;
        const ocy = OS / 2;
        const R   = baseRadius;

        oc.clearRect(0, 0, OS, OS);

        // ── Outer nebula dust ─────────────────────────────────────────────────
        function paintCloud(x, y, rx, ry, hue, alpha) {
            const r = Math.max(rx, ry);
            const grd = oc.createRadialGradient(x + ocx, y + ocy, 0,
                                                x + ocx, y + ocy, r);
            grd.addColorStop(0,   `hsla(${hue},55%,45%,${alpha})`);
            grd.addColorStop(0.5, `hsla(${hue},50%,35%,${alpha * 0.4})`);
            grd.addColorStop(1,   `hsla(${hue},45%,25%,0)`);
            oc.save();
            oc.scale(rx / r, ry / r);
            oc.beginPath();
            oc.arc((x + ocx) * (r / rx), (y + ocy) * (r / ry), r, 0, Math.PI * 2);
            oc.fillStyle = grd;
            oc.fill();
            oc.restore();
        }

        paintCloud(  0,          0,          R * 1.3, R * 0.6,  245, 0.20);
        paintCloud(  R * 0.25,   R * 0.08,   R * 0.9, R * 0.4,  280, 0.16);
        paintCloud( -R * 0.30,  -R * 0.12,   R * 0.8, R * 0.35, 210, 0.14);

        // ── Spiral arms (perspective tilt via scale) ──────────────────────────
        oc.save();
        oc.translate(ocx, ocy);
        oc.scale(1.0, 0.48);

        const ARMS = [
            { offset: 0,              hueMin: 310, hueMax: 350, count: 2800 },
            { offset: Math.PI,        hueMin: 200, hueMax: 260, count: 2800 },
            { offset: 0.6,            hueMin: 280, hueMax: 320, count: 1200 },
            { offset: Math.PI + 0.6,  hueMin: 190, hueMax: 220, count: 1200 },
        ];

        ARMS.forEach(arm => {
            for (let i = 0; i < arm.count; i++) {
                const t           = i / arm.count;
                const radialDist  = Math.pow(t, 0.62) * 0.92 + 0.04;
                const windAngle   = arm.offset + t * Math.PI * 2.5
                                  + (Math.random() - 0.5) * 0.55;
                const scatter     = (Math.random() - 0.5) * (0.04 + t * 0.14);
                const r           = (radialDist + scatter) * R;

                const px    = Math.cos(windAngle) * r;
                const py    = Math.sin(windAngle) * r;
                const hue   = arm.hueMin + Math.random() * (arm.hueMax - arm.hueMin);
                const sat   = 55 + Math.random() * 40;
                const lit   = 60 + Math.random() * 35;
                const alpha = (1.0 - t * 0.45) * (0.35 + Math.random() * 0.55);
                const size  = (1.0 - t * 0.5) * (Math.random() * 1.8 + 0.25);

                // Single fill per particle (no per-particle gradient on offscreen)
                oc.beginPath();
                oc.arc(px, py, size, 0, Math.PI * 2);
                oc.fillStyle = `hsla(${hue},${sat}%,${lit}%,${alpha})`;
                oc.fill();
            }
        });

        oc.restore();

        // ── Glowing core layers ───────────────────────────────────────────────
        oc.save();
        oc.translate(ocx, ocy);

        const c3 = oc.createRadialGradient(0, 0, 0, 0, 0, R * 0.40);
        c3.addColorStop(0,   'rgba(255,210,170,0.60)');
        c3.addColorStop(0.3, 'rgba(255,150,110,0.25)');
        c3.addColorStop(0.7, 'rgba(200, 90,170,0.12)');
        c3.addColorStop(1,   'rgba(150, 70,200,0)');
        oc.beginPath();
        oc.arc(0, 0, R * 0.40, 0, Math.PI * 2);
        oc.fillStyle = c3;
        oc.fill();

        const c2 = oc.createRadialGradient(0, 0, 0, 0, 0, R * 0.15);
        c2.addColorStop(0,   'rgba(255,255,230,0.95)');
        c2.addColorStop(0.5, 'rgba(255,225,170,0.65)');
        c2.addColorStop(1,   'rgba(255,195,140,0)');
        oc.beginPath();
        oc.arc(0, 0, R * 0.15, 0, Math.PI * 2);
        oc.fillStyle = c2;
        oc.fill();

        const c1 = oc.createRadialGradient(0, 0, 0, 0, 0, R * 0.048);
        c1.addColorStop(0,   'rgba(255,255,255,1)');
        c1.addColorStop(0.5, 'rgba(255,255,240,0.85)');
        c1.addColorStop(1,   'rgba(255,255,210,0)');
        oc.beginPath();
        oc.arc(0, 0, R * 0.048, 0, Math.PI * 2);
        oc.fillStyle = c1;
        oc.fill();

        // Centre cross-spike sparkle
        spikeStarOffscreen(oc, 0, 0, R * 0.08, 0.85);

        oc.restore();

        galaxyBuilt = true;
    }

    // Cross-spike star (drawn once on offscreen canvas)
    function spikeStarOffscreen(octx, x, y, size, alpha) {
        const spikes = 4;
        octx.save();
        octx.translate(x, y);
        octx.globalAlpha = alpha;
        for (let i = 0; i < spikes; i++) {
            octx.save();
            octx.rotate((i / spikes) * Math.PI);
            const grd = octx.createLinearGradient(0, -size, 0, size);
            grd.addColorStop(0,   'rgba(255,255,255,0)');
            grd.addColorStop(0.5, 'rgba(255,255,255,0.9)');
            grd.addColorStop(1,   'rgba(255,255,255,0)');
            octx.beginPath();
            octx.moveTo(0, -size);
            octx.lineTo(size * 0.07, 0);
            octx.lineTo(0,  size);
            octx.lineTo(-size * 0.07, 0);
            octx.closePath();
            octx.fillStyle = grd;
            octx.fill();
            octx.restore();
        }
        octx.globalAlpha = 1;
        octx.restore();
    }

    // ── On-canvas cross-spike (for bright foreground stars) ──────────────────
    function drawSpike(x, y, size, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = alpha;
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.rotate((i / 4) * Math.PI);
            const grd = ctx.createLinearGradient(0, -size, 0, size);
            grd.addColorStop(0,   'rgba(255,255,255,0)');
            grd.addColorStop(0.5, 'rgba(255,255,255,0.8)');
            grd.addColorStop(1,   'rgba(255,255,255,0)');
            ctx.beginPath();
            ctx.moveTo(0, -size); ctx.lineTo(size * 0.07, 0);
            ctx.lineTo(0,  size); ctx.lineTo(-size * 0.07, 0);
            ctx.closePath();
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // ── Main animation loop ───────────────────────────────────────────────────
    function draw() {
        requestAnimationFrame(draw);

        // Build offscreen texture if needed (lazy, once per resize)
        if (!galaxyBuilt) buildGalaxyTexture();

        // Update rotation speed
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.10;
        scrollVelocity *= 0.70;

        const idleSpeed   = 0.00025;
        const scrollBonus = Math.abs(smoothVelocity) * 0.0004;
        const dir = smoothVelocity >= 0 ? 1 : -1;
        angle += idleSpeed + dir * scrollBonus;

        // ── Clear ─────────────────────────────────────────────────────────────
        ctx.clearRect(0, 0, W, H);

        // ── Deep space background (single fillRect, no gradient per frame) ────
        ctx.fillStyle = '#0a0d18';
        ctx.fillRect(0, 0, W, H);

        // ── Background stars (plain arcs — very cheap) ────────────────────────
        bgStars.forEach(s => {
            s.tw += s.tws;
            const a = s.a * (0.7 + 0.3 * Math.sin(s.tw));
            if (s.bright) drawSpike(s.x, s.y, s.r * 3, a * 0.7);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${a})`;
            ctx.fill();
        });

        // ── Draw pre-rendered galaxy texture, rotated ─────────────────────────
        const OS = offCanvas.width;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.drawImage(offCanvas, -OS / 2, -OS / 2, OS, OS);
        ctx.restore();
    }

    draw();

})();
