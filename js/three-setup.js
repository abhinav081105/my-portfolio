// =====================================================
// THREE.JS 3D HERO BACKGROUND ANIMATION
// =====================================================

// Check if Three.js is available, if not use fallback
if (typeof THREE !== 'undefined') {
    // Three.js is loaded
    initThreeJsBackground();
} else {
    // Fallback to CSS-based animation
    console.log('Three.js not loaded, using fallback animations');
    initFallbackBackground();
}

function initThreeJsBackground() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d1117, 0.02);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0d1117, 0); // Transparent to blend with CSS gradient
    renderer.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Futuristic Particle System (Vortex / Cyberspace)
    const particleCount = window.innerWidth < 768 ? 1000 : 3500;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    
    // Cyberpunk color palette
    const colors = [
        new THREE.Color(0x0A74DA), // Primary Blue
        new THREE.Color(0x00E5FF), // Cyan
        new THREE.Color(0x7C4DFF), // Purple
        new THREE.Color(0x1f6feb)  // Hover Blue
    ];

    for(let i = 0; i < particleCount * 3; i+=3) {
        // Create a vortex tube shape
        const radius = Math.random() * 25 + 3;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 80;
        
        // Helix dispersion
        posArray[i] = Math.cos(theta) * radius + (Math.random() - 0.5) * 3;
        posArray[i+1] = y;
        posArray[i+2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 3;
        
        // Assign random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        colorArray[i] = color.r;
        colorArray[i+1] = color.g;
        colorArray[i+2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleMesh);

    // Glowing wireframe data rings
    const rings = [];
    for(let i=0; i<4; i++) {
        const ringGeo = new THREE.TorusGeometry(10 + (i*6), 0.05, 16, 120);
        const ringMat = new THREE.MeshBasicMaterial({
            color: colors[i],
            transparent: true,
            opacity: 0.25,
            wireframe: true,
            blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = (Math.random() - 0.5) * 40;
        scene.add(ring);
        rings.push({mesh: ring, speed: (Math.random() - 0.5) * 0.008});
    }

    // Floating Geometric Artifacts
    const artifacts = [];
    const artifactGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const artifactMat = new THREE.MeshBasicMaterial({
        color: 0x00E5FF,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    for(let i=0; i<8; i++) {
        const mesh = new THREE.Mesh(artifactGeo, artifactMat);
        mesh.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
        );
        scene.add(mesh);
        artifacts.push({
            mesh: mesh,
            rotSpeed: {
                x: Math.random() * 0.02,
                y: Math.random() * 0.02
            }
        });
    }

    camera.position.z = 18;
    camera.position.y = 5;
    camera.lookAt(0,0,0);

    // Mouse Interaction — smooth camera tilt via stored mouseX/mouseY
    // (values are updated by the global parallax RAF loop below)
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }, { passive: true });

    // Scroll Interaction (The "Wonder" setup)
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, {passive: true});

    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Parallax mouse effect (smooth dampening)
        targetX = mouseX * 0.005;
        targetY = mouseY * 0.005;
        
        // Scroll-driven camera movement
        // Camera flies forward/downwards into the vortex on scroll
        const scrollFactor = scrollY * 0.015;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        // Fly through the vortex
        camera.position.y = 5 - scrollFactor;
        camera.position.z = 18 - scrollFactor * 2.5; // Zoom out effect
        
        // Dynamic futuristic spiraling rotation
        camera.rotation.z = Math.sin(scrollFactor * 0.1) * 0.8;

        // Rotate particle system slowly and react to scroll
        particleMesh.rotation.y = elapsedTime * 0.03 + scrollFactor * 0.05;
        
        // Make the rings spin and undulate
        rings.forEach(ring => {
            ring.mesh.rotation.z -= ring.speed;
            ring.mesh.rotation.x = (Math.PI / 2) + Math.sin(elapsedTime * ring.speed * 50) * 0.1;
        });

        // Rotate artifacts
        artifacts.forEach(item => {
            item.mesh.rotation.x += item.rotSpeed.x;
            item.mesh.rotation.y += item.rotSpeed.y;
            item.mesh.position.y += Math.sin(elapsedTime * 2 + item.mesh.position.x) * 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }, 100);
    });
}

function initFallbackBackground() {
    // Fallback: Create an SVG-based animated background
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    canvas.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(10, 116, 218, 0.05) 0%, rgba(10, 116, 218, 0.02) 100%);
    `;

    // Create SVG with animated elements
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
    `;

    // Create multiple animated groups
    for (let i = 0; i < 10; i++) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', Math.random() * 100 + 50);
        rect.setAttribute('height', Math.random() * 100 + 50);
        rect.setAttribute('x', Math.random() * 1000);
        rect.setAttribute('y', Math.random() * 1000);
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', '#0A74DA');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('opacity', (Math.random() * 0.3 + 0.1).toString());

        g.appendChild(rect);

        // Add animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes move${i} {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg); }
            }
            #group${i} {
                animation: move${i} ${20 + Math.random() * 20}s infinite ease-in-out;
                transform-origin: center;
            }
        `;
        document.head.appendChild(style);

        g.setAttribute('id', `group${i}`);
        svg.appendChild(g);
    }

    canvas.appendChild(svg);
}

// =====================================================
// ENHANCED MOUSE TRACKING FOR PARALLAX
// =====================================================

// =====================================================
// RAF-BASED PARALLAX (reads mouse every frame, not every event)
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    let mouseX = 0;
    let mouseY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    // Only update stored coords on mousemove (cheap)
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });

    function parallaxLoop() {
        requestAnimationFrame(parallaxLoop);

        targetOffsetX = mouseX * 12;
        targetOffsetY = mouseY * 12;

        // Smooth lerp (ease 8%) — no layout read, only write once per frame
        currentOffsetX += (targetOffsetX - currentOffsetX) * 0.06;
        currentOffsetY += (targetOffsetY - currentOffsetY) * 0.06;

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `perspective(1200px) rotateX(${
                -currentOffsetY * 0.04
            }deg) rotateY(${
                currentOffsetX * 0.04
            }deg) translateZ(0)`;
        }
    }

    parallaxLoop();
});

// =====================================================
// GRADIENT ANIMATION BACKGROUND
// =====================================================

function createAnimatedGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                -45deg,
                rgba(10, 116, 218, 0.05),
                rgba(10, 116, 218, 0.02),
                rgba(10, 116, 218, 0.05)
            );
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            z-index: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', createAnimatedGradient);

// =====================================================
// RESPONSIVE CANVAS HANDLING
// =====================================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle any additional resize logic if needed
    }, 250);
});

// =====================================================
// PREFERS REDUCED MOTION SUPPORT
// =====================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    console.log('User prefers reduced motion - animations disabled');
    // Animations will be handled by CSS media query in animations.css
}
