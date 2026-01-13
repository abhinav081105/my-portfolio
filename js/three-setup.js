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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0d1117, 0.1);
    renderer.pixelRatio = window.devicePixelRatio;

    camera.position.z = 5;

    // Create floating geometric objects
    const objects = [];

    // Create particles/cubes
    for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 0.5 + 0.1,
            Math.random() * 0.5 + 0.1,
            Math.random() * 0.5 + 0.1
        );
        
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x0A74DA),
            emissive: new THREE.Color(0x0A74DA),
            emissiveIntensity: 0.3,
            wireframe: Math.random() > 0.5
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );

        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        cube.velocity = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
            rotX: (Math.random() - 0.5) * 0.01,
            rotY: (Math.random() - 0.5) * 0.01,
            rotZ: (Math.random() - 0.5) * 0.01
        };

        scene.add(cube);
        objects.push(cube);
    }

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x0A74DA, 
        transparent: true, 
        opacity: 0.2 
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0A74DA, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update positions and rotations
        objects.forEach(obj => {
            obj.position.x += obj.velocity.x;
            obj.position.y += obj.velocity.y;
            obj.position.z += obj.velocity.z;

            obj.rotation.x += obj.velocity.rotX;
            obj.rotation.y += obj.velocity.rotY;
            obj.rotation.z += obj.velocity.rotZ;

            // Bounce off boundaries
            if (Math.abs(obj.position.x) > 5) obj.velocity.x *= -1;
            if (Math.abs(obj.position.y) > 5) obj.velocity.y *= -1;
            if (Math.abs(obj.position.z) > 5) obj.velocity.z *= -1;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Mouse interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        camera.position.x = mouseX * 0.5;
        camera.position.y = mouseY * 0.5;
        camera.lookAt(0, 0, 0);
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

class ParallaxTracker {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.setup();
    }

    setup() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 100;
            this.mouseY = (e.clientY / window.innerHeight) * 100;
            this.updateParallax();
        });
    }

    updateParallax() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const offsetX = (this.mouseX - 50) * 0.3;
            const offsetY = (this.mouseY - 50) * 0.3;
            heroContent.style.transform = `perspective(1000px) rotateX(${offsetY * -0.05}deg) rotateY(${offsetX * 0.05}deg)`;
        }
    }
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxTracker();
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
