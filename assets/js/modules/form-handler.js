/**
 * Zenvia Water - Form Handler
 * Contact form validation and submission
 */

(function() {
    'use strict';

    /**
     * Validation rules
     */
    const validators = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9]{10}$/,
        name: /^[a-zA-Z\s]{2,50}$/
    };

    /**
     * Validate individual field
     */
    function validateField(field) {
        const fieldType = field.type;
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const errorSpan = field.parentElement.querySelector('.form-error');

        let isValid = true;
        let errorMessage = '';

        // Required field check
        if (field.hasAttribute('required') && !fieldValue) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (fieldType === 'email' && fieldValue && !validators.email.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Phone validation
        else if (fieldType === 'tel' && fieldValue && !validators.phone.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
        // Name validation
        else if (fieldName === 'name' && fieldValue && !validators.name.test(fieldValue)) {
            isValid = false;
            errorMessage = 'Please enter a valid name (letters and spaces only)';
        }
        // Minimum length
        else if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (fieldValue.length < minLength) {
                isValid = false;
                errorMessage = `Minimum ${minLength} characters required`;
            }
        }

        // Update UI
        if (!isValid) {
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-300');

            if (errorSpan) {
                errorSpan.textContent = errorMessage;
                errorSpan.classList.remove('hidden');
            }
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-300');

            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.classList.add('hidden');
            }
        }

        return isValid;
    }

    /**
     * Validate entire form
     */
    function validateForm(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Handle form submission
     */
    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const successDiv = document.getElementById('form-success');
        const errorDiv = document.getElementById('form-error');

        // Validate form
        if (!validateForm(form)) {
            return false;
        }

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Disable submit button
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // Simulate form submission (replace with actual API call)
        // In production, replace this with your actual form submission logic
        setTimeout(() => {
            // Simulate success
            const isSuccess = true; // Change based on actual API response

            if (isSuccess) {
                // Show success message
                if (successDiv) {
                    successDiv.classList.remove('hidden');
                }

                if (errorDiv) {
                    errorDiv.classList.add('hidden');
                }

                // Reset form
                form.reset();

                // Redirect to WhatsApp after form submission
                const whatsappMsg = `Hi, I just submitted the contact form.%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0ASubject: ${data.subject}%0A%0AMessage: ${data.message}`;
                setTimeout(() => {
                    window.open(`https://wa.me/919767194735?text=${whatsappMsg}`, '_blank');
                }, 1500);

                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successDiv) {
                        successDiv.classList.add('hidden');
                    }
                }, 5000);

            } else {
                // Show error message
                if (errorDiv) {
                    errorDiv.textContent = 'Something went wrong. Please try again or call us directly.';
                    errorDiv.classList.remove('hidden');
                }

                if (successDiv) {
                    successDiv.classList.add('hidden');
                }
            }

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');

        }, 1500);

        return false;
    }

    /**
     * Initialize form validation and submission
     */
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (!contactForm) {
            return;
        }

        // Form submission
        contactForm.addEventListener('submit', handleSubmit);

        // Real-time validation on blur
        const fields = contactForm.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });

            // Clear error on focus
            field.addEventListener('focus', function() {
                this.classList.remove('border-red-500');
                const errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan) {
                    errorSpan.classList.add('hidden');
                }
            });
        });

    }

    /**
     * Initialize newsletter form (if present)
     */
    function initNewsletterForm() {
        const newsletterForm = document.getElementById('newsletter-form');

        if (!newsletterForm) {
            return;
        }

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (!emailInput || !validateField(emailInput)) {
                return false;
            }

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';

            // Simulate subscription (replace with actual API call)
            setTimeout(() => {
                alert('Thank you for subscribing to Zenvia updates!');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }, 1000);

            return false;
        });
    }

    /**
     * Initialize all forms
     */
    function init() {
        initContactForm();
        initNewsletterForm();

    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
