/**
 * Zenvia Water - GSAP Animations
 * Slow, fluid water-inspired motion. Minimal and intentional.
 * Requires: GSAP library loaded
 */

(function() {
    'use strict';

    function isGSAPLoaded() {
        return typeof gsap !== 'undefined';
    }

    /**
     * Hero section — gentle reveal, like water settling
     */
    function initHeroAnimations() {
        if (!isGSAPLoaded()) return;

        var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        var heroHeading = document.querySelector('.hero-heading');
        var heroSubheading = document.querySelector('.hero-subheading');
        var heroBottle = document.querySelector('.hero-bottle-img');
        var heroCTAs = document.querySelectorAll('.hero-cta');

        if (heroHeading) {
            tl.from(heroHeading, { y: 30, duration: 1 }, 0.2);
        }
        if (heroSubheading) {
            tl.from(heroSubheading, { y: 20, duration: 1 }, 0.5);
        }
        if (heroCTAs.length > 0) {
            tl.from(heroCTAs, { y: 15, duration: 0.8, stagger: 0.15 }, 0.8);
        }
        if (heroBottle) {
            tl.from(heroBottle, { y: 40, duration: 1.4, ease: 'sine.out' }, 0.3);

            // Slow, gentle float — like a bottle on still water
            gsap.to(heroBottle, {
                y: -8,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1.8
            });
        }
    }

    /**
     * Section headings — fade up gently on scroll
     */
    function initHeadingAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        document.querySelectorAll('.section-heading').forEach(function(heading) {
            gsap.from(heading, {
                scrollTrigger: { trigger: heading, start: 'top 88%' },
                y: 20,
                duration: 0.9,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Feature cards — subtle rise, staggered like ripples
     */
    function initFeatureAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        var featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(function(card, index) {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                duration: 0.8,
                ease: 'power2.out',
                delay: index * 0.12
            });
        });
    }

    /**
     * Product cards — gentle stagger reveal
     */
    function initProductAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        var productItems = document.querySelectorAll('.product-item');
        if (productItems.length > 0) {
            gsap.from(productItems, {
                scrollTrigger: { trigger: productItems[0], start: 'top 80%' },
                y: 40,
                stagger: 0.2,
                duration: 0.9,
                ease: 'power2.out'
            });
        }
    }

    /**
     * Stats counter — smooth count-up
     */
    function initStatsAnimation() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        document.querySelectorAll('.stat-number').forEach(function(stat) {
            var finalValue = parseInt(stat.textContent || '0');
            var obj = { val: 0 };

            gsap.to(obj, {
                scrollTrigger: { trigger: stat, start: 'top 80%' },
                val: finalValue,
                duration: 2,
                ease: 'power1.out',
                onUpdate: function() {
                    stat.textContent = Math.ceil(obj.val);
                }
            });
        });
    }

    /**
     * Water wave — slow, breathing motion
     */
    function initWaterWaveEffects() {
        if (!isGSAPLoaded()) return;

        document.querySelectorAll('.water-wave').forEach(function(wave) {
            gsap.to(wave, {
                y: 6,
                duration: 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    /**
     * Generic scroll-in elements — used for .animate-on-scroll
     */
    function initScrollAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 25,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Initialize all animations
     */
    function init() {
        if (!isGSAPLoaded()) return;

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Respect user preference for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        initHeroAnimations();
        initHeadingAnimations();
        initFeatureAnimations();
        initProductAnimations();
        initStatsAnimation();
        initWaterWaveEffects();
        initScrollAnimations();
    }

    var gsapRetries = 0;
    function waitForGSAP() {
        if (isGSAPLoaded()) {
            init();
        } else if (gsapRetries < 50) {
            gsapRetries++;
            setTimeout(waitForGSAP, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForGSAP);
    } else {
        waitForGSAP();
    }

})();
