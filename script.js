/* ==========================================================================
   ALCHEMY AI - Ultra-Premium JavaScript Interactivity
   Advanced Animations • Counter Effects • Smooth Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // NAVIGATION - Scroll Effects & Mobile Menu
    // =========================================================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Add scrolled class to navbar
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // =========================================================================
    // ANIMATED COUNTERS - Stats Bar
    // =========================================================================
    const animateCounter = (element, target, suffix = '', duration = 2000) => {
        let startTime = null;
        const startValue = 0;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (target - startValue) * easeOut;

            // Format number
            if (suffix === 'M+') {
                element.textContent = currentValue.toFixed(1) + 'M+';
            } else if (suffix === 'x') {
                element.textContent = Math.floor(currentValue) + 'x';
            } else if (suffix === '%') {
                element.textContent = Math.floor(currentValue) + '%';
            } else {
                element.textContent = Math.floor(currentValue) + '+';
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    // =========================================================================
    // INTERSECTION OBSERVER - Scroll Animations
    // =========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Fade-in elements
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // For stats, trigger counter animation
                if (entry.target.classList.contains('stat-item')) {
                    const valueElement = entry.target.querySelector('.stat-value');
                    if (valueElement && !valueElement.dataset.animated) {
                        valueElement.dataset.animated = 'true';
                        const count = parseFloat(valueElement.dataset.count);
                        const suffix = valueElement.dataset.suffix || '+';
                        animateCounter(valueElement, count, suffix);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Observe stat items for counter animation
    document.querySelectorAll('.stat-item').forEach(el => {
        fadeInObserver.observe(el);
    });

    // =========================================================================
    // PRICING TOGGLE - Monthly/Annual
    // =========================================================================
    const pricingToggle = document.getElementById('pricingToggle');
    const priceAmounts = document.querySelectorAll('.pricing-price .amount:not(.custom)');

    pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;

        priceAmounts.forEach(amount => {
            const monthly = amount.dataset.monthly;
            const annual = amount.dataset.annual;

            // Animate price change
            amount.style.transform = 'scale(0.8)';
            amount.style.opacity = '0';

            setTimeout(() => {
                amount.textContent = isAnnual ? annual : monthly;
                amount.style.transform = 'scale(1)';
                amount.style.opacity = '1';
            }, 150);
        });
    });

    // =========================================================================
    // SMOOTH SCROLL - Navigation Links
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================================
    // CARD HOVER EFFECTS - Enhanced Interactions
    // =========================================================================
    const cards = document.querySelectorAll('.agent-card, .pricing-card, .team-card, .feature-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });

    // =========================================================================
    // TESTIMONIALS - Pause on Hover
    // =========================================================================
    const testimonialsTrack = document.querySelector('.testimonials-track');

    if (testimonialsTrack) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                testimonialsTrack.style.animationPlayState = 'paused';
            });

            card.addEventListener('mouseleave', () => {
                testimonialsTrack.style.animationPlayState = 'running';
            });
        });
    }

    // =========================================================================
    // PARALLAX EFFECT - Hero Shapes
    // =========================================================================
    const heroShapes = document.querySelectorAll('.shape');
    const floatingShapes = document.querySelectorAll('.float-shape');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 15;
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });

        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // =========================================================================
    // TIMELINE - Interactive Steps
    // =========================================================================
    const timelineSteps = document.querySelectorAll('.timeline-step');

    timelineSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            timelineSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
        });
    });

    // =========================================================================
    // BUTTON RIPPLE EFFECT
    // =========================================================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // =========================================================================
    // INITIAL SETUP
    // =========================================================================

    // Trigger scroll handler on load
    handleScroll();

    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // Console branding
    console.log(
        '%c🔮 Alchemy AI %c Ultra-Premium Website',
        'background: linear-gradient(135deg, #0C3483, #3498DB); color: white; padding: 10px 20px; border-radius: 5px 0 0 5px; font-weight: bold; font-size: 14px;',
        'background: #F0F8FF; color: #0C3483; padding: 10px 20px; border-radius: 0 5px 5px 0; font-weight: bold; font-size: 14px;'
    );
});
