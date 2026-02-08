/**
 * Zenvia Water - Lazy Loader
 * Image lazy loading using Intersection Observer
 * Performance optimization for faster page loads
 */

(function() {
    'use strict';

    /**
     * Configuration
     */
    const config = {
        rootMargin: '50px',
        threshold: 0.01,
        lazyClass: 'lazy-image',
        loadedClass: 'loaded',
        errorClass: 'error'
    };

    /**
     * Image Observer
     */
    let imageObserver;

    /**
     * Load image function
     */
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');

        if (!src) {
            return;
        }

        // Create a new image to preload
        const tempImg = new Image();

        tempImg.onload = function() {
            // Set the actual image source
            img.src = src;

            if (srcset) {
                img.srcset = srcset;
            }

            // Remove data attributes
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');

            // Add loaded class for fade-in effect
            img.classList.add(config.loadedClass);
            img.classList.remove(config.lazyClass);

            // Unobserve the image
            if (imageObserver) {
                imageObserver.unobserve(img);
            }
        };

        tempImg.onerror = function() {
            console.error('Failed to load image:', src);
            img.classList.add(config.errorClass);

            // Unobserve even on error
            if (imageObserver) {
                imageObserver.unobserve(img);
            }
        };

        // Start loading
        tempImg.src = src;
    }

    /**
     * Initialize Intersection Observer
     */
    function initIntersectionObserver() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            loadAllImagesImmediately();
            return;
        }

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                }
            });
        };

        const observerOptions = {
            rootMargin: config.rootMargin,
            threshold: config.threshold
        };

        imageObserver = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all lazy images
        const lazyImages = document.querySelectorAll(`img[data-src]`);
        lazyImages.forEach(img => {
            // Add lazy class for styling
            img.classList.add(config.lazyClass);

            // Observe the image
            imageObserver.observe(img);
        });

    }

    /**
     * Fallback: Load all images immediately (for unsupported browsers)
     */
    function loadAllImagesImmediately() {
        const lazyImages = document.querySelectorAll(`img[data-src]`);

        lazyImages.forEach(img => {
            loadImage(img);
        });
    }

    /**
     * Handle dynamically added images
     */
    function observeNewImages() {
        // Mutation Observer to watch for new images
        if ('MutationObserver' in window) {
            const mutationObserver = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeName === 'IMG' && node.hasAttribute('data-src')) {
                            node.classList.add(config.lazyClass);
                            if (imageObserver) {
                                imageObserver.observe(node);
                            } else {
                                loadImage(node);
                            }
                        } else if (node.querySelectorAll) {
                            const newImages = node.querySelectorAll('img[data-src]');
                            newImages.forEach(img => {
                                img.classList.add(config.lazyClass);
                                if (imageObserver) {
                                    imageObserver.observe(img);
                                } else {
                                    loadImage(img);
                                }
                            });
                        }
                    });
                });
            });

            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    /**
     * Lazy load background images
     */
    function initBackgroundImages() {
        const bgElements = document.querySelectorAll('[data-bg]');

        if (!('IntersectionObserver' in window)) {
            bgElements.forEach(element => {
                const bgUrl = element.getAttribute('data-bg');
                element.style.backgroundImage = `url('${bgUrl}')`;
                element.removeAttribute('data-bg');
            });
            return;
        }

        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgUrl = element.getAttribute('data-bg');

                    if (bgUrl) {
                        element.style.backgroundImage = `url('${bgUrl}')`;
                        element.removeAttribute('data-bg');
                        bgObserver.unobserve(element);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        bgElements.forEach(element => {
            bgObserver.observe(element);
        });
    }

    /**
     * Lazy load iframes (for maps, videos, etc.)
     */
    function initIframeLazyLoading() {
        const lazyIframes = document.querySelectorAll('iframe[data-src]');

        if (!('IntersectionObserver' in window)) {
            lazyIframes.forEach(iframe => {
                iframe.src = iframe.getAttribute('data-src');
                iframe.removeAttribute('data-src');
            });
            return;
        }

        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.getAttribute('data-src');

                    if (src) {
                        iframe.src = src;
                        iframe.removeAttribute('data-src');
                        iframeObserver.unobserve(iframe);
                    }
                }
            });
        }, {
            rootMargin: '100px'
        });

        lazyIframes.forEach(iframe => {
            iframeObserver.observe(iframe);
        });
    }

    /**
     * Initialize all lazy loading features
     */
    function init() {
        initIntersectionObserver();
        observeNewImages();
        initBackgroundImages();
        initIframeLazyLoading();

    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /**
     * Expose method to manually trigger lazy loading (for dynamic content)
     */
    window.ZenviaLazyLoader = {
        refresh: function() {
            initIntersectionObserver();
        },
        loadImage: loadImage
    };

})();
