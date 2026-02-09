/**
 * Zenvia Water - Water Quality Scroll Animation
 * Inspired by ReactBits: ScrollReveal, Counter, SplitText
 * 
 * Creates an interactive scroll-driven animation where a water bottle
 * tilts and pours droplets that reveal water quality values with count-up effects.
 * 
 * Dependencies: GSAP 3.12+ with ScrollTrigger plugin (already loaded in site)
 */

(function () {
    'use strict';

    // Water quality data
    var WATER_METRICS = [
        { id: 'ph',        value: 7.2,  decimals: 1, unit: 'pH',    label: 'pH Level',           desc: 'Optimal balance' },
        { id: 'tds',       value: 50,   decimals: 0, unit: 'mg/L',  label: 'TDS',                desc: 'Total dissolved solids' },
        { id: 'calcium',   value: 35,   decimals: 0, unit: 'mg/L',  label: 'Calcium',            desc: 'Essential mineral' },
        { id: 'magnesium', value: 10,   decimals: 0, unit: 'mg/L',  label: 'Magnesium',          desc: 'For strong bones' },
        { id: 'alkalinity',value: 8.0,  decimals: 1, unit: 'pH',    label: 'Alkalinity',         desc: 'Ionized & balanced' }
    ];

    /**
     * Split text into individual words wrapped in spans (ReactBits ScrollReveal style)
     */
    function splitTextIntoWords(element) {
        var text = element.textContent.trim();
        var words = text.split(/\s+/);
        element.innerHTML = '';
        words.forEach(function (word) {
            var span = document.createElement('span');
            span.className = 'wq-split-word';
            span.textContent = word;
            element.appendChild(span);
        });
        return element.querySelectorAll('.wq-split-word');
    }

    /**
     * Animate count-up for a value element (ReactBits Counter/CountUp style)
     */
    function animateCountUp(element, targetValue, decimals, duration) {
        var obj = { val: 0 };
        return gsap.to(obj, {
            val: targetValue,
            duration: duration || 1.5,
            ease: 'power2.out',
            onUpdate: function () {
                element.textContent = obj.val.toFixed(decimals);
            }
        });
    }

    /**
     * Create ambient floating particles
     */
    function createParticles(container) {
        var particleCount = 12;
        for (var i = 0; i < particleCount; i++) {
            var particle = document.createElement('div');
            particle.className = 'wq-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (3 + Math.random() * 6) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = (0.1 + Math.random() * 0.2).toString();
            container.appendChild(particle);

            // Gentle floating animation
            gsap.to(particle, {
                y: -30 - Math.random() * 50,
                x: (Math.random() - 0.5) * 30,
                opacity: 0,
                duration: 3 + Math.random() * 4,
                ease: 'power1.out',
                repeat: -1,
                delay: Math.random() * 3
            });
        }
    }

    /**
     * Animate ripple rings
     */
    function animateRipples(container) {
        var ripples = container.querySelectorAll('.wq-ripple');
        ripples.forEach(function (ripple, i) {
            gsap.to(ripple, {
                scale: 1.5 + i * 0.3,
                opacity: 0.3,
                duration: 2 + i * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: i * 0.8
            });
        });
    }

    /**
     * Main scroll animation timeline
     */
    function initWaterQualityAnimation() {
        var section = document.querySelector('.water-quality-section');
        if (!section) return;

        var headingEl = section.querySelector('.wq-reveal-heading');
        var subtitleEl = section.querySelector('.wq-subtitle');
        var bottleSvg = section.querySelector('.wq-bottle-svg');
        var waterLevel = section.querySelector('.wq-water-level');
        var droplets = section.querySelectorAll('.wq-droplet');
        var scrollHint = section.querySelector('.wq-scroll-hint');
        var summaryBar = section.querySelector('.wq-summary-bar');
        var pinContainer = section.querySelector('.wq-pin-container');

        if (!headingEl || !droplets.length) return;

        // --- 1. Split heading text into words (ReactBits SplitText) ---
        var words = splitTextIntoWords(headingEl);

        // --- 2. Create particles ---
        createParticles(section);
        animateRipples(section);

        // --- 3. Build the master timeline pinned to the section ---
        var masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=250%',
                pin: pinContainer,
                scrub: 1,
                anticipatePin: 1
            }
        });

        // --- Phase 1: Reveal heading words one by one (ScrollReveal) ---
        words.forEach(function (word, i) {
            masterTL.to(word, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.3,
                ease: 'power2.out'
            }, 0.05 + i * 0.08);
        });

        // --- Phase 1b: Fade in subtitle ---
        if (subtitleEl) {
            masterTL.to(subtitleEl, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, 0.4);
        }

        // Show scroll hint at start, fade out as scroll progresses
        if (scrollHint) {
            masterTL.fromTo(scrollHint, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }, 
                0
            );
            masterTL.to(scrollHint, {
                opacity: 0,
                duration: 0.3
            }, 0.6);
        }

        // --- Phase 2: Bottle tilts (pours) ---
        if (bottleSvg) {
            masterTL.to(bottleSvg, {
                rotation: -15,
                duration: 1,
                ease: 'power2.inOut'
            }, 0.5);
        }

        // --- Phase 2b: Water level drops inside bottle ---
        if (waterLevel) {
            masterTL.to(waterLevel, {
                attr: { y: 240, height: 30 },
                duration: 1.5,
                ease: 'power1.in'
            }, 0.5);
        }

        // --- Phase 3: Droplets fall and reveal (staggered) ---
        droplets.forEach(function (droplet, index) {
            var valueEl = droplet.querySelector('.wq-droplet-value');
            var metric = WATER_METRICS[index];
            var startTime = 0.8 + index * 0.25;

            // Droplet falls in and scales up
            masterTL.to(droplet, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.4)'
            }, startTime);

            // Count-up animation for the value (ReactBits Counter)
            if (valueEl && metric) {
                var countObj = { val: 0 };
                masterTL.to(countObj, {
                    val: metric.value,
                    duration: 0.8,
                    ease: 'power2.out',
                    onUpdate: function () {
                        valueEl.textContent = countObj.val.toFixed(metric.decimals);
                    }
                }, startTime + 0.15);
            }
        });

        // --- Phase 4: Summary bar fades in ---
        if (summaryBar) {
            masterTL.to(summaryBar, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, 2.2);
        }

        // --- Phase 5: Bottle returns to neutral ---
        if (bottleSvg) {
            masterTL.to(bottleSvg, {
                rotation: 0,
                duration: 0.6,
                ease: 'power2.inOut'
            }, 2.5);
        }
    }

    /**
     * Init with GSAP availability check
     */
    function isReady() {
        return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
    }

    function init() {
        if (!isReady()) return;
        gsap.registerPlugin(ScrollTrigger);

        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Show everything without animation
            document.querySelectorAll('.wq-split-word').forEach(function (w) {
                w.style.opacity = '1';
                w.style.filter = 'none';
            });
            document.querySelectorAll('.wq-droplet').forEach(function (d) {
                d.style.opacity = '1';
                d.style.transform = 'none';
            });
            var subtitle = document.querySelector('.wq-subtitle');
            if (subtitle) subtitle.style.opacity = '1';
            var summary = document.querySelector('.wq-summary-bar');
            if (summary) summary.style.opacity = '1';
            return;
        }

        initWaterQualityAnimation();
    }

    var retries = 0;
    function waitForLibs() {
        if (isReady()) {
            init();
        } else if (retries < 50) {
            retries++;
            setTimeout(waitForLibs, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForLibs);
    } else {
        waitForLibs();
    }

})();
