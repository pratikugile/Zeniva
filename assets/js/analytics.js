/**
 * Zenvia Water - Google Analytics
 * Analytics tracking placeholder
 *
 * IMPORTANT: Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics 4 Measurement ID
 * Example: G-XXXXXXXXXX
 */

(function() {
    'use strict';

    /**
     * Configuration
     */
    const config = {
        measurementId: 'GA_MEASUREMENT_ID', // Replace with your actual GA4 Measurement ID
        enabled: false, // Set to true when you have a real measurement ID
        trackPageViews: true,
        trackClicks: true,
        trackFormSubmissions: true,
        trackPhoneCalls: true,
        trackWhatsApp: true
    };

    /**
     * Check if gtag is loaded
     */
    function isGtagLoaded() {
        return typeof gtag !==  'undefined';
    }

    /**
     * Initialize Google Analytics
     */
    function initGoogleAnalytics() {
        if (!config.enabled) {
            return;
        }

        // Load gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.measurementId}`;
        document.head.appendChild(script);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            dataLayer.push(arguments);
        };

        gtag('js', new Date());
        gtag('config', config.measurementId, {
            'page_path': window.location.pathname
        });

    }

    /**
     * Track page view
     */
    function trackPageView(pagePath) {
        if (!config.enabled || !config.trackPageViews) {
            return;
        }

        if (isGtagLoaded()) {
            gtag('config', config.measurementId, {
                'page_path': pagePath || window.location.pathname
            });
        }
    }

    /**
     * Track custom event
     */
    function trackEvent(eventName, eventParams) {
        if (!config.enabled) {
            return;
        }

        if (isGtagLoaded()) {
            gtag('event', eventName, eventParams);
        }
    }

    /**
     * Track button clicks
     */
    function trackButtonClick(buttonName, buttonLocation) {
        trackEvent('button_click', {
            'button_name': buttonName,
            'button_location': buttonLocation
        });
    }

    /**
     * Track phone call clicks
     */
    function initPhoneTracking() {
        if (!config.trackPhoneCalls) {
            return;
        }

        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

        phoneLinks.forEach(link => {
            link.addEventListener('click', function() {
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                trackEvent('phone_call_click', {
                    'phone_number': phoneNumber,
                    'location': this.closest('header, footer, section, main')?.id || 'unknown'
                });
            });
        });
    }

    /**
     * Track WhatsApp clicks
     */
    function initWhatsAppTracking() {
        if (!config.trackWhatsApp) {
            return;
        }

        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');

        whatsappLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('whatsapp_click', {
                    'location': this.closest('header, footer, section, main')?.id || 'unknown',
                    'link_text': this.textContent.trim()
                });
            });
        });
    }

    /**
     * Track form submissions
     */
    function initFormTracking() {
        if (!config.trackFormSubmissions) {
            return;
        }

        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formId = this.id || 'unknown_form';
                trackEvent('form_submission', {
                    'form_id': formId,
                    'form_name': this.getAttribute('name') || formId
                });
            });
        });
    }

    /**
     * Track scroll depth
     */
    function initScrollDepthTracking() {
        let scrollDepths = [25, 50, 75, 100];
        let triggeredDepths = [];

        window.addEventListener('scroll', function() {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = window.scrollY;
            const percentScrolled = Math.round((scrolled / scrollHeight) * 100);

            scrollDepths.forEach(depth => {
                if (percentScrolled >= depth && !triggeredDepths.includes(depth)) {
                    triggeredDepths.push(depth);
                    trackEvent('scroll_depth', {
                        'percent_scrolled': depth,
                        'page_path': window.location.pathname
                    });
                }
            });
        }, { passive: true });
    }

    /**
     * Track navigation clicks
     */
    function initNavigationTracking() {
        const navLinks = document.querySelectorAll('nav a, .nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('navigation_click', {
                    'link_text': this.textContent.trim(),
                    'link_url': this.getAttribute('href'),
                    'location': this.closest('header, footer')?.tagName.toLowerCase() || 'unknown'
                });
            });
        });
    }

    /**
     * Track CTA clicks
     */
    function initCTATracking() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .hero-cta');

        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                trackEvent('cta_click', {
                    'cta_text': this.textContent.trim(),
                    'cta_location': this.closest('section')?.id || 'unknown',
                    'cta_class': this.className
                });
            });
        });
    }

    /**
     * Track product interest
     */
    function initProductTracking() {
        const productCards = document.querySelectorAll('.product-item, .card-product');

        productCards.forEach(card => {
            card.addEventListener('click', function() {
                const productName = this.querySelector('h3, h4')?.textContent.trim() || 'Unknown';
                trackEvent('product_interest', {
                    'product_name': productName
                });
            });
        });
    }

    /**
     * Track outbound links
     */
    function initOutboundLinkTracking() {
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('outbound_link_click', {
                    'link_url': this.getAttribute('href'),
                    'link_text': this.textContent.trim()
                });
            });
        });
    }

    /**
     * Track page time
     */
    function initPageTimeTracking() {
        const startTime = Date.now();

        window.addEventListener('beforeunload', function() {
            const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds

            trackEvent('page_time_spent', {
                'time_seconds': timeSpent,
                'page_path': window.location.pathname
            });
        });
    }

    /**
     * Initialize all tracking
     */
    function init() {
        // Initialize Google Analytics
        initGoogleAnalytics();

        // Wait for content to be ready
        setTimeout(function() {
            if (config.trackClicks) {
                initNavigationTracking();
                initCTATracking();
                initProductTracking();
                initOutboundLinkTracking();
            }

            if (config.trackPhoneCalls) {
                initPhoneTracking();
            }

            if (config.trackWhatsApp) {
                initWhatsAppTracking();
            }

            if (config.trackFormSubmissions) {
                initFormTracking();
            }

            initScrollDepthTracking();
            initPageTimeTracking();

        }, 1000);
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
     * Expose API for manual tracking
     */
    window.ZenviaAnalytics = {
        trackPageView: trackPageView,
        trackEvent: trackEvent,
        trackButtonClick: trackButtonClick
    };

})();
