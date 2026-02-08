/**
 * Zenvia Water - Lottie Loader
 * Load and control Lottie animations
 * Requires: Lottie library (bodymovin) loaded
 */

(function() {
    'use strict';

    /**
     * Check if Lottie is loaded
     */
    function isLottieLoaded() {
        return typeof lottie !== 'undefined';
    }

    /**
     * Animation instances storage
     */
    const animations = {};

    /**
     * Load water drop animation (hero section)
     */
    function loadWaterDropAnimation() {
        const container = document.getElementById('water-drop-anim');

        if (!container || !isLottieLoaded()) {
            return null;
        }

        animations.waterDrop = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/water-drop.json',
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        });

        return animations.waterDrop;
    }

    /**
     * Load loading animation
     */
    function loadLoadingAnimation() {
        const container = document.getElementById('loading-anim');

        if (!container || !isLottieLoaded()) {
            return null;
        }

        animations.loading = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/loading-water.json'
        });

        return animations.loading;
    }

    /**
     * Load water wave animation
     */
    function loadWaterWaveAnimation() {
        const container = document.getElementById('water-wave-anim');

        if (!container || !isLottieLoaded()) {
            return null;
        }

        animations.waterWave = lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/water-wave.json'
        });

        return animations.waterWave;
    }

    /**
     * Load quality process icons (play on scroll)
     */
    function loadQualityProcessAnimations() {
        const processSteps = document.querySelectorAll('.quality-process-step');

        processSteps.forEach((step, index) => {
            const animContainer = step.querySelector('.process-icon-anim');

            if (!animContainer || !isLottieLoaded()) {
                return;
            }

            const animation = lottie.loadAnimation({
                container: animContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: `assets/animations/process-step-${index + 1}.json`
            });

            // Store reference
            animations[`processStep${index}`] = animation;

            // Play animation when scrolled into view
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animation.play();
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.5
                });

                observer.observe(step);
            } else {
                // Fallback: play immediately
                animation.play();
            }
        });
    }

    /**
     * Control animation (play, pause, stop)
     */
    function controlAnimation(animationName, action) {
        const animation = animations[animationName];

        if (!animation) {
            return;
        }

        switch (action) {
            case 'play':
                animation.play();
                break;
            case 'pause':
                animation.pause();
                break;
            case 'stop':
                animation.stop();
                break;
            case 'restart':
                animation.stop();
                animation.play();
                break;
            default:
                break;
        }
    }

    /**
     * Set animation speed
     */
    function setAnimationSpeed(animationName, speed) {
        const animation = animations[animationName];

        if (animation) {
            animation.setSpeed(speed);
        }
    }

    /**
     * Pause all animations (for performance)
     */
    function pauseAllAnimations() {
        Object.keys(animations).forEach(key => {
            if (animations[key]) {
                animations[key].pause();
            }
        });
    }

    /**
     * Resume all animations
     */
    function resumeAllAnimations() {
        Object.keys(animations).forEach(key => {
            if (animations[key]) {
                animations[key].play();
            }
        });
    }

    /**
     * Handle page visibility changes (pause animations when tab is not visible)
     */
    function handleVisibilityChange() {
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseAllAnimations();
            } else {
                resumeAllAnimations();
            }
        });
    }

    /**
     * Initialize all Lottie animations
     */
    function init() {
        if (!isLottieLoaded()) {
            return;
        }

        // Load animations
        loadWaterDropAnimation();
        loadLoadingAnimation();
        loadWaterWaveAnimation();
        loadQualityProcessAnimations();

        // Handle visibility changes
        handleVisibilityChange();

    }

    /**
     * Wait for Lottie library to load
     */
    let lottieRetries = 0;
    function waitForLottie() {
        if (isLottieLoaded()) {
            init();
        } else if (lottieRetries < 50) {
            lottieRetries++;
            setTimeout(waitForLottie, 100);
        }
    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForLottie);
    } else {
        waitForLottie();
    }

    /**
     * Expose API for manual control
     */
    window.ZenviaLottie = {
        control: controlAnimation,
        setSpeed: setAnimationSpeed,
        pauseAll: pauseAllAnimations,
        resumeAll: resumeAllAnimations,
        animations: animations
    };

})();
