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
     * Hero section — staggered reveal with water-settling ease
     * Targets actual classes present in the HTML
     */
    function initHeroAnimations() {
        if (!isGSAPLoaded()) return;

        var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        var heroBadge = document.querySelector('.hero-badge');
        var heroHeading = document.querySelector('.hero-heading');
        var heroSubtitle = document.querySelector('.hero-subtitle');
        var heroCTAGroup = document.querySelector('.hero-cta-group');
        var heroTrustStrip = document.querySelector('.hero-trust-strip');
        var heroStatsBlock = document.querySelector('.hero-stats-block');

        // Badge drops in first
        if (heroBadge) {
            tl.from(heroBadge, { y: -20, opacity: 0, duration: 0.7 }, 0.1);
        }
        // Heading slides up
        if (heroHeading) {
            tl.from(heroHeading, { y: 40, opacity: 0, duration: 1 }, 0.25);
        }
        // Subtitle fades in
        if (heroSubtitle) {
            tl.from(heroSubtitle, { y: 25, opacity: 0, duration: 0.9 }, 0.5);
        }
        // CTA buttons stagger in
        if (heroCTAGroup) {
            var ctaButtons = heroCTAGroup.querySelectorAll('a');
            if (ctaButtons.length > 0) {
                tl.from(ctaButtons, { y: 20, opacity: 0, duration: 0.7, stagger: 0.15 }, 0.75);
            }
        }
        // Trust strip fades in
        if (heroTrustStrip) {
            tl.from(heroTrustStrip, { y: 15, opacity: 0, duration: 0.6 }, 1);
        }
        // Desktop stats cards stagger in from right
        if (heroStatsBlock) {
            var statCards = heroStatsBlock.querySelectorAll('.glass-effect-dark');
            if (statCards.length > 0) {
                tl.from(statCards, { x: 40, opacity: 0, duration: 0.8, stagger: 0.18 }, 0.4);
            }
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
                opacity: 0,
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
        if (featureCards.length > 0) {
            gsap.from(featureCards, {
                scrollTrigger: {
                    trigger: featureCards[0],
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.15
            });
        }
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
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.9,
                ease: 'power2.out'
            });
        }
    }

    /**
     * Stats counter — smooth count-up with suffix support ("+", "/7", etc.)
     */
    function initStatsAnimation() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        document.querySelectorAll('.stat-number').forEach(function(stat) {
            var finalValue = parseInt(stat.textContent || '0');
            var suffix = stat.getAttribute('data-suffix') || '';
            var obj = { val: 0 };

            gsap.to(obj, {
                scrollTrigger: { trigger: stat, start: 'top 85%' },
                val: finalValue,
                duration: 2.2,
                ease: 'power1.out',
                onUpdate: function() {
                    var displayVal = Math.ceil(obj.val);
                    // Format numbers > 999 with commas
                    if (displayVal >= 1000) {
                        stat.textContent = displayVal.toLocaleString('en-IN') + suffix;
                    } else {
                        stat.textContent = displayVal + suffix;
                    }
                }
            });
        });
    }

    /**
     * Stat cards — stagger in on scroll
     */
    function initStatCardAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        var statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            gsap.from(statCards, {
                scrollTrigger: { trigger: statCards[0], start: 'top 85%' },
                y: 30,
                opacity: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: 'power2.out'
            });
        }
    }

    /**
     * Certification badges — subtle scale-in on scroll
     */
    function initCertBadgeAnimations() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        var badges = document.querySelectorAll('.py-12 .flex-col.items-center');
        if (badges.length > 0) {
            gsap.from(badges, {
                scrollTrigger: { trigger: badges[0], start: 'top 85%' },
                scale: 0.8,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.4)'
            });
        }
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
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Parallax for section backgrounds — gentle depth
     */
    function initParallaxEffects() {
        if (!isGSAPLoaded() || typeof ScrollTrigger === 'undefined') return;

        document.querySelectorAll('.glass-effect.rounded-2xl').forEach(function(el) {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
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
        initStatCardAnimations();
        initCertBadgeAnimations();
        initWaterWaveEffects();
        initScrollAnimations();
        initParallaxEffects();
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
