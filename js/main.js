// =====================================================
// ENHANCED JAVASCRIPT - Lenis Smooth Scroll + ScrollTimeline
// =====================================================

// ===== LENIS SMOOTH SCROLLING INITIALIZATION =====
let lenis = null;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Integrate with RAF for smooth 60fps performance
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Fix for smooth scroll with click anchors
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    lenis.scrollTo(target, { offset: -80 });
                }
            }
        });
    });
}

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// EmailJS loader promise (resolves when emailjs global is available)
let _emailjsLoader = null;
function loadExternalScript(src, timeout = 8000) {
    return new Promise((resolve, reject) => {
        // If already loaded, resolve
        if (window.emailjs) return resolve(window.emailjs);
        // Check if script tag already present
        let el = Array.from(document.scripts).find(s => s.src && s.src.includes(src));
        if (!el) {
            el = document.createElement('script');
            el.src = src;
            el.async = true;
            document.head.appendChild(el);
        }

        const onLoad = () => {
            if (window.emailjs) return resolve(window.emailjs);
            // small defer to allow library to initialize
            setTimeout(() => {
                if (window.emailjs) resolve(window.emailjs);
                else reject(new Error('EmailJS script loaded but `emailjs` not available'));
            }, 50);
        };

        el.addEventListener('load', onLoad);
        el.addEventListener('error', () => reject(new Error('Failed to load script: ' + src)));

        // Timeout fallback
        setTimeout(() => {
            if (window.emailjs) resolve(window.emailjs);
            else reject(new Error('Timed out loading script: ' + src));
        }, timeout);
    });
}

function ensureEmailJS() {
    if (_emailjsLoader) return _emailjsLoader;
    const sdkUrl = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
    _emailjsLoader = loadExternalScript(sdkUrl, 8000)
        .then((emailjs) => {
            try { emailjs.init('hywpW1ToBSFh_RWDZ'); } catch (e) { console.warn('EmailJS init error', e); }
            return emailjs;
        })
        .catch(err => {
            console.warn('ensureEmailJS failed:', err);
            return null;
        });
    return _emailjsLoader;
}

// Formspree fallback endpoint (replace with your form's ID)
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

// ===== ANIMATION STATE =====
let animationEnabled = true;

// =====================================================
// 1. NAVIGATION FUNCTIONALITY
// =====================================================

// Hamburger menu toggle with animation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const lines = hamburger.querySelectorAll('span');
    lines.forEach((line, index) => {
        line.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// =====================================================
// 2. NAVBAR SCROLL EFFECTS
// =====================================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    updateActiveNavLink();
    updateParallaxElements();
});

// =====================================================
// 3. ACTIVE SECTION INDICATOR
// =====================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[data-section="${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// =====================================================
// 4. ADVANCED INTERSECTION OBSERVER
// =====================================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('animated');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger number counter if applicable
            if (entry.target.classList.contains('counter')) {
                startCounter(entry.target);
            }
            // Animate any SVG strokes inside the element (experience icons etc.)
            const svgs = entry.target.querySelectorAll('svg');
            svgs.forEach(svg => {
                const shapes = svg.querySelectorAll('path, line, polyline, rect, circle');
                shapes.forEach(s => {
                    try {
                        const length = (s.getTotalLength && s.getTotalLength()) || 200;
                        s.style.strokeDasharray = length;
                        s.style.strokeDashoffset = length;
                        // trigger reflow then animate to 0
                        // eslint-disable-next-line no-unused-expressions
                        s.getBoundingClientRect();
                        s.style.transition = 'stroke-dashoffset 1s cubic-bezier(0.2,0.9,0.2,1)';
                        s.style.strokeDashoffset = '0';
                        s.style.opacity = '1';
                    } catch (e) {
                        // some elements don't support getTotalLength
                    }
                });
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// =====================================================
// 5. ELEMENT OBSERVATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.section-title, .skill-category, .project-card, .service-card, .info-card, .experience-item, .exp-card'
    );
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// =====================================================
// 6. SMOOTH SCROLL BEHAVIOR
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// 7. ENHANCED CONTACT FORM
// =====================================================

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        animateElement(contactForm);
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('.btn-text') ? submitButton.querySelector('.btn-text').textContent : submitButton.textContent;
    submitButton.classList.add('sending');
    submitButton.querySelector('.btn-text') && (submitButton.querySelector('.btn-text').textContent = 'Sending...');
    submitButton.disabled = true;

    // Prepare template parameters for EmailJS
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };

    // Ensure EmailJS is available, then send. If loading fails or sending errors,
    // attempt a Formspree fallback. If that also fails, log data and notify user.
    ensureEmailJS().then((emailjs) => {
        if (emailjs && typeof emailjs.send === 'function') {
            return emailjs.send('service_kachn1q', 'template_476nh9u', templateParams, 'hywpW1ToBSFh_RWDZ')
                .then(() => ({ ok: true, via: 'emailjs' }))
                .catch(err => ({ ok: false, err }));
        }
        return { ok: false, err: new Error('EmailJS not available') };
    }).then(result => {
        if (result && result.ok) {
            showNotification(`Message sent — from ${name} <${email}>`, 'success');
            console.log('EmailJS sent:', templateParams);
            contactForm.reset();

            submitButton.classList.remove('sending');
            submitButton.querySelector('.btn-text') && (submitButton.querySelector('.btn-text').textContent = originalText);
            submitButton.disabled = false;
            return;
        }

        // EmailJS not available or failed — try Formspree POST fallback
        console.warn('EmailJS send failed or unavailable, attempting Formspree fallback', result && result.err);

        // Prepare payload for Formspree
        const payload = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Attempt the fallback POST
        fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(async (resp) => {
            if (resp.ok) {
                showNotification('Message sent via fallback service — thank you!', 'success');
                contactForm.reset();
                console.log('Formspree sent:', payload);
            } else {
                // Try to parse JSON error body for details
                let errBody = null;
                try { errBody = await resp.json(); } catch (e) { errBody = await resp.text(); }
                console.error('Formspree response error', resp.status, errBody);
                showNotification('Failed to send message via fallback — please try again later.', 'error');
                console.log('Form Data (fallback failure):', payload);
            }
        }).catch(err => {
            console.error('Formspree fetch error', err);
            showNotification('Failed to send message — please try again later.', 'error');
            console.log('Form Data (fallback):', payload);
        }).finally(() => {
            submitButton.classList.remove('sending');
            submitButton.querySelector('.btn-text') && (submitButton.querySelector('.btn-text').textContent = originalText);
            submitButton.disabled = false;
        });
    });
});

// =====================================================
// 8. EMAIL VALIDATION
// =====================================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =====================================================
// 9. NOTIFICATION SYSTEM
// =====================================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#3fb950' : type === 'error' ? '#f85149' : '#0A74DA'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        animation: slideInFromRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        font-weight: 500;
        font-family: var(--font-body);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// =====================================================
// 10. PARALLAX SCROLLING
// =====================================================

function updateParallaxElements() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        
        if (scrollPosition + window.innerHeight > elementOffset) {
            const offset = (scrollPosition - elementOffset) * speed;
            element.style.transform = `translateY(${offset}px)`;
        }
    });
}

// =====================================================
// 11. NUMBER COUNTER ANIMATION
// =====================================================

function startCounter(element) {
    const finalValue = parseInt(element.textContent);
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);
    const duration = 1500;
    const steps = 50;
    const stepDuration = duration / steps;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(counter);
        }
        element.textContent = currentValue + '+';
    }, stepDuration);
}

// =====================================================
// 12. ELEMENT ANIMATION HELPER
// =====================================================

function animateElement(element, animationName = 'wobble') {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = `${animationName} 0.6s ease`;
    }, 10);
}

// =====================================================
// 13. PARALLAX MOUSE TRACKING
// =====================================================

class MouseTracker {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 100;
            this.mouseY = (e.clientY / window.innerHeight) * 100;
            this.updateEffect();
        });
    }

    updateEffect() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const offsetX = (this.mouseX - 50) * 0.3;
            const offsetY = (this.mouseY - 50) * 0.3;
            heroContent.style.transform = `perspective(1200px) rotateX(${offsetY * -0.05}deg) rotateY(${offsetX * 0.05}deg) translateZ(0)`;
        }
    }
}

// =====================================================
// 14. SCROLL TO TOP BUTTON
// =====================================================

function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #0A74DA, #1f6feb);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(10, 116, 218, 0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseover', () => {
        scrollToTopBtn.style.transform = 'scale(1.2) rotate(-15deg)';
    });

    scrollToTopBtn.addEventListener('mouseout', () => {
        scrollToTopBtn.style.transform = 'scale(1) rotate(0deg)';
    });
}

// =====================================================
// 15. KEYBOARD NAVIGATION
// =====================================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// =====================================================
// 16. CARD TILT EFFECT
// =====================================================

class CardTilt {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.project-card, .service-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.tiltCard(e, card));
            card.addEventListener('mouseleave', (e) => this.resetTilt(e, card));
        });
    }

    tiltCard(e, card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    resetTilt(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// Legacy skill bar initializer removed — skill fills are now controlled
// exclusively by the scroll-trigger IntersectionObserver added below.

// =====================================================
// 18. LAZY LOADING IMAGES
// =====================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('lazy-loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =====================================================
// 19. INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    // Skill fill animation is handled by the scroll-trigger IntersectionObserver
    // which animates `.skill-fill` when they enter the viewport.
    createScrollToTopButton();
    new MouseTracker();
    new CardTilt();
    
    // Add stagger animation delays to cards
    const cards = document.querySelectorAll('.skill-category, .project-card, .service-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
    // Futuristic skill rings and custom cursor
    createSkillRings();
    initCustomCursor();
    // Initialize EmailJS (public key)
    // Try to ensure EmailJS is available and initialized (will no-op if already loaded)
    ensureEmailJS();
});

// =====================================================
// 20. CONSOLE MESSAGE
// =====================================================

console.log('%c✨ Welcome to Abhinav\'s Portfolio! ✨', 'font-size: 20px; font-weight: bold; color: #0A74DA; text-shadow: 0 0 10px rgba(10, 116, 218, 0.5);');
console.log('%cThanks for visiting! Feel free to explore the code and get inspired.', 'font-size: 14px; color: #c9d1d9;');
console.log('%cConnect with me on LinkedIn or GitHub to collaborate!', 'font-size: 12px; color: #8b949e;');

// =====================================================
// Skill bar scroll-trigger animation
// When a `.skill-fill` enters the viewport, animate its width
// from 0 to the percentage value (read from inline style or data attribute).
// Respects prefers-reduced-motion.
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fills = document.querySelectorAll('.skill-fill');

    // Capture target widths and reset to 0
    fills.forEach(el => {
        // Read inline style width (e.g. "85%") or data-percentage attribute
        const inline = (el.getAttribute('style') || '').match(/width\s*:\s*([^;]+)/i);
        let target = '';
        if (inline && inline[1]) target = inline[1].trim();
        if (!target) target = el.getAttribute('data-percentage') || '';
        if (target && !target.endsWith('%')) target = target + '%';
        if (target) el.dataset.targetWidth = target;

        // Reset initial width so animation is visible on scroll
        el.style.width = '0%';
    });

    if (prefersReduced) {
        // If user prefers reduced motion, set bars immediately
        fills.forEach(el => {
            const t = el.dataset.targetWidth || '0%';
            el.style.width = t;
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = el.dataset.targetWidth || el.getAttribute('data-percentage') || '';
            if (target) {
                el.style.width = target.endsWith('%') ? target : (target + '%');
            }
            obs.unobserve(el);
        });
    }, { threshold: 0.35 });

    fills.forEach(el => observer.observe(el));
});

// =====================================================
// Futuristic skill ring generator
// Replaces the visual bar with an SVG ring and animates the stroke
// =====================================================
function createSkillRings() {
    const items = document.querySelectorAll('.skill-item');
    if (!items.length) return;

    items.forEach(item => {
        // Read percentage from existing .skill-percentage text
        const pctEl = item.querySelector('.skill-percentage');
        let pct = 0;
        if (pctEl) {
            const m = pctEl.textContent.match(/(\d{1,3})/);
            if (m) pct = Math.min(100, parseInt(m[1], 10));
        }

        // Create visual container
        const visual = document.createElement('div');
        visual.className = 'skill-visual';

        const ringWrap = document.createElement('div');
        ringWrap.className = 'skill-ring';

        // SVG ring (two circles: bg + progress)
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');

        const bg = document.createElementNS(svgNS, 'circle');
        bg.setAttribute('cx', '50'); bg.setAttribute('cy', '50'); bg.setAttribute('r', '42');
        bg.classList.add('ring-bg');
        bg.setAttribute('fill', 'none');

        const prog = document.createElementNS(svgNS, 'circle');
        prog.setAttribute('cx', '50'); prog.setAttribute('cy', '50'); prog.setAttribute('r', '42');
        prog.classList.add('ring-progress');
        prog.setAttribute('fill', 'none');

        svg.appendChild(bg);
        svg.appendChild(prog);
        ringWrap.appendChild(svg);

        const glow = document.createElement('div');
        glow.className = 'ring-glow';
        ringWrap.appendChild(glow);

        const label = document.createElement('div');
        label.className = 'ring-percentage';
        label.textContent = pct + '%';
        ringWrap.appendChild(label);

        visual.appendChild(ringWrap);

        // Move skill name to the right of the ring
        const nameWrap = document.createElement('div');
        nameWrap.style.flex = '1';
        const name = item.querySelector('.skill-name') ? item.querySelector('.skill-name').textContent : '';
        const h = document.createElement('div');
        h.style.display = 'flex';
        h.style.flexDirection = 'column';
        h.innerHTML = `<span style="font-weight:600;color:var(--text-primary)">${name}</span><span style="font-size:0.85rem;color:var(--text-secondary)">Proficiency</span>`;
        nameWrap.appendChild(h);
        visual.appendChild(nameWrap);

        // Insert visual before the .skill-bar and hide original bar
        const bar = item.querySelector('.skill-bar');
        if (bar) bar.style.display = 'none';
        item.appendChild(visual);

        // Prepare circle animation values
        const radius = 42;
        const circumference = 2 * Math.PI * radius;
        prog.style.strokeDasharray = `${circumference}`;
        prog.style.strokeDashoffset = `${circumference}`;

        // Store target dashoffset in dataset
        const targetOffset = circumference - (pct / 100) * circumference;
        prog.dataset.targetOffset = targetOffset;

        // Accessibility
        item.setAttribute('role', 'progressbar');
        item.setAttribute('aria-valuemin', '0');
        item.setAttribute('aria-valuemax', '100');
        item.setAttribute('aria-valuenow', String(pct));
    });

    // Animate rings when they enter viewport
    const ringObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const prog = entry.target.querySelector('.ring-progress');
            if (prog && prog.dataset.targetOffset) {
                prog.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.2,0.9,0.2,1)';
                prog.style.strokeDashoffset = prog.dataset.targetOffset;
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.skill-item').forEach(el => ringObserver.observe(el));
}

// =====================================================
// Custom cursor + trail
// =====================================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track movement
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // create a small trail particle
        const t = document.createElement('div');
        t.className = 'cursor-trail';
        t.style.left = (e.clientX + (Math.random() - 0.5) * 8) + 'px';
        t.style.top = (e.clientY + (Math.random() - 0.5) * 8) + 'px';
        t.style.opacity = '0.9';
        t.style.transition = 'opacity 600ms linear, transform 600ms linear';
        document.body.appendChild(t);
        requestAnimationFrame(() => {
            t.style.transform = 'translate(-50%, -50%) scale(1.8)';
            t.style.opacity = '0';
        });
        setTimeout(() => t.remove(), 650);
    });

    // Hover interactions for clickable elements
    const hoverTargets = 'a, button, .btn, .project-card, .service-card, .nav-link';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursor.style.width = '28px'; cursor.style.height = '28px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.width = '18px'; cursor.style.height = '18px';
        });
    });

    // Hide native cursor on supported devices
    document.documentElement.style.cursor = 'none';
}

