// =====================================================
// Lenis + ScrollTimeline Integration & Fallbacks
// =====================================================

/**
 * ScrollTimeline Polyfill & Fallback System
 * Provides scroll-driven animations for all browsers
 * Chrome 115+ supports @property and animation-timeline natively
 * For older browsers, JavaScript fallback uses Intersection Observer
 */

// Wrap in IIFE to avoid polluting global scope and duplicate identifier errors
(function(){
    // Check ScrollTimeline Browser Support
const SUPPORTS_SCROLL_TIMELINE = CSS.supports('animation-timeline', 'view()');
const SUPPORTS_ANIMATION_RANGE = CSS.supports('animation-range', 'entry 0% cover 100%');

console.log('ScrollTimeline Support:', SUPPORTS_SCROLL_TIMELINE);
console.log('Animation-Range Support:', SUPPORTS_ANIMATION_RANGE);

// =====================================================
// Scroll-Driven Animation Fallback for Older Browsers
// =====================================================
if (!SUPPORTS_SCROLL_TIMELINE) {
    class ScrollDrivenAnimationsFallback {
        constructor() {
            this.elements = [];
            this.scrollY = window.scrollY;
            this.setupElements();
            this.attachListeners();
        }

        setupElements() {
            // Hero Content - Parallax
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                this.elements.push({
                    element: heroContent,
                    type: 'parallax',
                    startOffset: 0,
                    endOffset: window.innerHeight * 0.5,
                    effect: (progress) => {
                        const translateY = -progress * 50;
                        heroContent.style.transform = `translateY(${translateY}px)`;
                    }
                });
            }

            // Section Titles - Fade In
            document.querySelectorAll('.section-title').forEach(title => {
                this.elements.push({
                    element: title,
                    type: 'fadeInUp',
                    effect: (progress) => {
                        title.style.opacity = Math.min(1, progress * 1.5);
                        title.style.transform = `translateY(${Math.max(0, 30 - progress * 30)}px)`;
                    }
                });
            });

            // Skill Items
            document.querySelectorAll('.skill-item').forEach(item => {
                this.elements.push({
                    element: item,
                    type: 'cardReveal',
                    effect: (progress) => {
                        item.style.opacity = Math.min(1, progress * 1.5);
                        const clipPercentage = Math.min(100, progress * 100);
                        item.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
                    }
                });
            });

            // Project Cards - Staggered
            document.querySelectorAll('.project-card').forEach((card, index) => {
                this.elements.push({
                    element: card,
                    type: 'cardReveal',
                    staggerDelay: index * 0.1,
                    effect: (progress) => {
                        const adjustedProgress = Math.max(0, progress - (index * 0.1));
                        card.style.opacity = Math.min(1, adjustedProgress * 1.5);
                        const clipPercentage = Math.min(100, adjustedProgress * 100);
                        card.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
                    }
                });
            });

            // Service Cards
            document.querySelectorAll('.service-card').forEach(card => {
                this.elements.push({
                    element: card,
                    type: 'fadeInUp',
                    effect: (progress) => {
                        card.style.opacity = Math.min(1, progress * 1.5);
                        card.style.transform = `translateY(${Math.max(0, 30 - progress * 30)}px)`;
                    }
                });
            });

            // Experience Items
            document.querySelectorAll('.experience-item').forEach(item => {
                this.elements.push({
                    element: item,
                    type: 'fadeInUp',
                    effect: (progress) => {
                        item.style.opacity = Math.min(1, progress * 1.5);
                        item.style.transform = `translateY(${Math.max(0, 30 - progress * 30)}px)`;
                    }
                });
            });

            // Info Cards
            document.querySelectorAll('.info-card').forEach(card => {
                this.elements.push({
                    element: card,
                    type: 'cardReveal',
                    effect: (progress) => {
                        card.style.opacity = Math.min(1, progress * 1.5);
                        const clipPercentage = Math.min(100, progress * 100);
                        card.style.clipPath = `polygon(0 0, ${clipPercentage}% 0, ${clipPercentage}% 100%, 0 100%)`;
                    }
                });
            });

            // Skill Bars - Fill Effect
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                this.elements.push({
                    element: bar,
                    type: 'barFill',
                    effect: (progress) => {
                        const width = progress * 100;
                        bar.style.width = `${Math.min(100, width)}%`;
                    }
                });
            });

            // Contact Form
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                this.elements.push({
                    element: contactForm,
                    type: 'fadeInUp',
                    effect: (progress) => {
                        contactForm.style.opacity = Math.min(1, progress * 1.5);
                        contactForm.style.transform = `translateY(${Math.max(0, 30 - progress * 30)}px)`;
                    }
                });
            }
        }

        calculateScrollProgress(element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Element is below viewport
            if (elementTop > windowHeight) return 0;
            // Element is above viewport
            if (elementTop + elementHeight < 0) return 1;

            // Calculate progress (0 to 1) as element scrolls into view
            const progress = 1 - (elementTop / (windowHeight + elementHeight));
            return Math.max(0, Math.min(1, progress));
        }

        updateAnimations() {
            this.elements.forEach(item => {
                const progress = this.calculateScrollProgress(item.element);
                if (progress > 0) {
                    item.effect(progress);
                }
            });
        }

        attachListeners() {
            // Passive scroll listener for better performance
            window.addEventListener('scroll', () => this.updateAnimations(), { passive: true });
            window.addEventListener('resize', () => this.updateAnimations(), { passive: true });

            // Initial update
            this.updateAnimations();
        }
    }

    // Initialize fallback on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ScrollDrivenAnimationsFallback();
        });
    } else {
        new ScrollDrivenAnimationsFallback();
    }
}

// =====================================================
// ScrollTimeline Enhancement for Native Support
// =====================================================
if (SUPPORTS_SCROLL_TIMELINE) {
    console.log('✓ Native ScrollTimeline Support Detected - Using CSS Animations');
    
    // Add marker classes for CSS @supports detection
    document.documentElement.setAttribute('data-scroll-timeline-support', 'true');
    
    // Additional optimizations for native implementation
    const style = document.createElement('style');
    style.textContent = `
        /* Optimize GPU acceleration for scroll animations */
        [data-scroll-timeline-support="true"] {
            --scroll-timeline-enabled: true;
        }
        
        /* Ensure smooth rendering during scroll animations */
        @media (prefers-reduced-motion: no-preference) {
            [data-scroll-timeline-support="true"] * {
                will-change: auto;
            }
            
            [data-scroll-timeline-support="true"] .section-title,
            [data-scroll-timeline-support="true"] .project-card,
            [data-scroll-timeline-support="true"] .skill-item,
            [data-scroll-timeline-support="true"] .service-card {
                will-change: opacity, transform;
            }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// Accessibility: Respect prefers-reduced-motion
// =====================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    console.log('Reduced motion preference detected - disabling scroll animations');
    
    // Disable scroll animations for accessibility
    const style = document.createElement('style');
    style.textContent = `
        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
            }
            .hero-content {
                transform: translateY(0) !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// =====================================================
// Performance Monitoring (Optional)
// =====================================================
window.ScrollTimelineMetrics = {
    nativeSupport: SUPPORTS_SCROLL_TIMELINE,
    animationRangeSupport: SUPPORTS_ANIMATION_RANGE,
    animationsUsing: SUPPORTS_SCROLL_TIMELINE ? 'CSS @animation-timeline' : 'JavaScript Fallback',
    lastFrameTime: 0,
    fps: 0,

    measurePerformance() {
        if (window.requestAnimationFrame) {
            const startTime = performance.now();
            window.requestAnimationFrame((endTime) => {
                const frameTime = endTime - startTime;
                this.lastFrameTime = frameTime;
                this.fps = Math.round(1000 / frameTime);
            });
        }
    }
};

// Log metrics periodically
if (window.location.search.includes('debug')) {
    setInterval(() => {
        console.log(`Scroll Animations FPS: ${window.ScrollTimelineMetrics.fps}`);
    }, 5000);
}

console.log('✓ Lenis + ScrollTimeline integration loaded');

})();
