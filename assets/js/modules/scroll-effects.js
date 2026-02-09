/**
 * Zenvia Water - Scroll Effects
 * Gentle, water-inspired scroll interactions
 * Requires: GSAP and ScrollTrigger loaded
 */

(function() {
    'use strict';

    function isReady() {
        return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    }

    /**
     * Header shrink on scroll
     */
    function setupHeaderScroll() {
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'header-scrolled', targets: '#main-header' }
        });
    }

    /**
     * Fade-in elements — slow upward drift like bubbles rising
     */
    function setupFadeInOnScroll() {
        document.querySelectorAll('.fade-in-scroll').forEach(function(el) {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                y: 25,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Section reveals — gentle emergence
     */
    function setupSectionReveal() {
        document.querySelectorAll('.reveal-section').forEach(function(section) {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Stagger list animations — ripple effect
     */
    function setupStaggerAnimations() {
        document.querySelectorAll('.stagger-list').forEach(function(list) {
            var items = list.querySelectorAll('.stagger-item');
            gsap.from(items, {
                scrollTrigger: { trigger: list, start: 'top 82%' },
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Refresh ScrollTrigger on resize
     */
    function setupResizeHandler() {
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                ScrollTrigger.refresh();
            }, 250);
        });
    }

    function init() {
        if (!isReady()) return;
        gsap.registerPlugin(ScrollTrigger);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        setupHeaderScroll();
        setupFadeInOnScroll();
        setupSectionReveal();
        setupStaggerAnimations();
        setupResizeHandler();
    }

    var retries = 0;
    function waitForLibs() {
        if (isReady()) { init(); }
        else if (retries < 50) { retries++; setTimeout(waitForLibs, 100); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForLibs);
    } else {
        waitForLibs();
    }

})();
