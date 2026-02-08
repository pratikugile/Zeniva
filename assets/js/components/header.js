/**
 * Zenvia Water - Header Component
 * Navigation with mobile menu and FOUC prevention
 */

(function() {
    'use strict';

    // Header HTML template
    const headerHTML = `
        <header class="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300" id="main-header">
            <nav class="container-custom py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center">
                        <img src="assets/images/logo/zenvia-logo.svg" alt="Zenvia - Pure Water, Pure Life" class="h-12" loading="eager">
                    </a>

                    <!-- Desktop Navigation -->
                    <ul class="hidden md:flex space-x-8 items-center">
                        <li><a href="index.html" class="nav-link">Home</a></li>
                        <li><a href="about.html" class="nav-link">About Us</a></li>
                        <li><a href="products.html" class="nav-link">Products</a></li>
                        <li><a href="quality.html" class="nav-link">Quality</a></li>
                        <li><a href="service-area.html" class="nav-link">Service Area</a></li>
                        <li><a href="contact.html" class="btn-primary text-sm px-6 py-2">Contact Us</a></li>
                    </ul>

                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded" aria-label="Toggle menu">
                        <svg id="menu-icon-open" class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <svg id="menu-icon-close" class="w-6 h-6 text-gray-900 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
                    <ul class="flex flex-col space-y-4">
                        <li><a href="index.html" class="nav-link block text-lg">Home</a></li>
                        <li><a href="about.html" class="nav-link block text-lg">About Us</a></li>
                        <li><a href="products.html" class="nav-link block text-lg">Products</a></li>
                        <li><a href="quality.html" class="nav-link block text-lg">Quality</a></li>
                        <li><a href="service-area.html" class="nav-link block text-lg">Service Area</a></li>
                        <li><a href="contact.html" class="btn-primary block text-center mt-2">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    `;

    /**
     * Insert header HTML into the placeholder
     */
    function insertHeader() {
        const placeholder = document.getElementById('header-placeholder');

        if (placeholder) {
            placeholder.innerHTML = headerHTML;
            placeholder.classList.add('loaded');

            // Highlight active page
            highlightActivePage();

            // Initialize mobile menu
            initMobileMenu();

            // Initialize scroll effects
            initScrollEffects();
        }
    }

    /**
     * Highlight the active page in navigation
     */
    function highlightActivePage() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Check if this link matches the current page
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Initialize mobile menu toggle functionality
     */
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const openIcon = document.getElementById('menu-icon-open');
        const closeIcon = document.getElementById('menu-icon-close');

        if (menuBtn && mobileMenu && openIcon && closeIcon) {
            menuBtn.addEventListener('click', function() {
                const isHidden = mobileMenu.classList.contains('hidden');

                if (isHidden) {
                    // Open menu
                    mobileMenu.classList.remove('hidden');
                    openIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                } else {
                    // Close menu
                    mobileMenu.classList.add('hidden');
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });

            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.add('hidden');
                    openIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                });
            });

            // Close menu on window resize (desktop)
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    if (window.innerWidth >= 768) {
                        mobileMenu.classList.add('hidden');
                        openIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                }, 250);
            });
        }
    }

    /**
     * Initialize scroll effects for header
     */
    function initScrollEffects() {
        const header = document.getElementById('main-header');

        if (!header) return;

        let lastScrollTop = 0;
        let scrollThreshold = 80;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add scrolled class when scrolled past threshold
            if (scrollTop > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    /**
     * Initialize header immediately on script load
     * This prevents FOUC (Flash of Unstyled Content)
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertHeader);
    } else {
        insertHeader();
    }

})();
