/**
 * Zenvia Water - Main JavaScript
 * Global initialization and utilities
 */

(function() {
    'use strict';

    /**
     * Initialize mobile sticky CTA bar
     * Two large buttons: Call (blue) and WhatsApp (green)
     * Designed for fast thumb-tap conversions
     */
    function initMobileStickyCTA() {
        if (window.innerWidth >= 768) return;
        if (document.getElementById('mobile-sticky-cta')) return;

        var stickyDiv = document.createElement('div');
        stickyDiv.id = 'mobile-sticky-cta';
        stickyDiv.setAttribute('role', 'complementary');
        stickyDiv.setAttribute('aria-label', 'Quick contact');
        stickyDiv.innerHTML =
            '<a href="tel:+919767194735" aria-label="Call Zenvia Water" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#0891b2;color:#fff;padding:14px 0;font-weight:700;font-size:15px;text-decoration:none;border-right:1px solid rgba(255,255,255,0.2)">' +
                '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>' +
                'Call Now' +
            '</a>' +
            '<a href="https://wa.me/919767194735?text=Hi%20I%20want%20to%20order%20Zenvia%20water" target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;background:#22c55e;color:#fff;padding:14px 0;font-weight:700;font-size:15px;text-decoration:none">' +
                '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
                'WhatsApp' +
            '</a>';

        stickyDiv.style.cssText = 'position:fixed;bottom:0;left:0;right:0;display:flex;z-index:50;box-shadow:0 -2px 10px rgba(0,0,0,0.15);padding-bottom:env(safe-area-inset-bottom,0)';
        document.body.appendChild(stickyDiv);

        // Push page content above the bar
        document.body.style.paddingBottom = '56px';
    }

    /**
     * Handle Window Resize
     */
    function handleResize() {
        var stickyDiv = document.getElementById('mobile-sticky-cta');
        if (window.innerWidth >= 768) {
            if (stickyDiv) stickyDiv.style.display = 'none';
             document.body.style.paddingBottom = '0';
        } else {
             if (stickyDiv) {
                stickyDiv.style.display = 'flex';
                document.body.style.paddingBottom = '56px';
             } else {
                initMobileStickyCTA();
             }
        }
    }

    /**
     * Initialize Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === "#" || !targetId) return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize Scroll To Top Button
     */
    function initScrollToTop() {
        var btn = document.createElement('button');
        btn.id = 'scroll-to-top';
        btn.innerHTML = '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
        btn.style.cssText = 'position:fixed;bottom:24px;right:24px;width:48px;height:48px;background:#0891b2;color:#fff;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(8,145,178,0.3);opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:40;';
        btn.setAttribute('aria-label', 'Scroll to top');
        
        document.body.appendChild(btn);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        }, { passive: true });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Adjust for mobile sticky bar
        function adjustPosition() {
             if (window.innerWidth < 768) {
                btn.style.bottom = '76px'; 
            } else {
                btn.style.bottom = '24px';
            }
        }
        
        window.addEventListener('resize', adjustPosition);
        adjustPosition();
    }

    /**
     * Initialize scroll effects
     */
    function initScrollEffects() {
        if (typeof gsap === 'undefined') {
            document.documentElement.classList.remove('js-loaded');
            return;
        }

        document.documentElement.classList.add('js-loaded');

        window.addEventListener('load', function() {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    }

    // Initialize all modules
    function init() {
        initMobileStickyCTA();
        handleResize();
        initSmoothScroll();
        initScrollToTop();
        initScrollEffects();
        
        window.addEventListener('resize', handleResize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
