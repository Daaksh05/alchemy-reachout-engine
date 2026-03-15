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
            if (suffix === 'M') {
                element.textContent = currentValue.toFixed(1) + 'M';
            } else if (suffix === 'x') {
                element.textContent = Math.floor(currentValue) + 'x';
            } else if (suffix === '%') {
                element.textContent = currentValue.toFixed(1) + '%';
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
    // =========================================================================
    // CONFIGURATOR - Build Your Growth Team
    // =========================================================================
    const configCards = document.querySelectorAll('.config-card');
    const configTotalElement = document.getElementById('configTotal');
    const deployTeamBtn = document.getElementById('deployTeamBtn');

    // Base platform fee
    let totalPrice = 49;
    let totalPriceINR = 3900;

    if (configCards.length > 0 && configTotalElement) {
        configCards.forEach(card => {
            card.addEventListener('click', () => {
                // Toggle active state
                card.classList.toggle('active');

                // Get price from data attributes
                const price = parseInt(card.dataset.price);
                const priceINR = parseInt(card.dataset.priceInr) || (price * 80);

                // Update total price
                if (card.classList.contains('active')) {
                    totalPrice += price;
                    totalPriceINR += priceINR;
                } else {
                    totalPrice -= price;
                    totalPriceINR -= priceINR;
                }

                // Animate the number change
                configTotalElement.style.transform = 'scale(1.1)';
                configTotalElement.style.color = '#3498DB';

                setTimeout(() => {
                    configTotalElement.textContent = `$${totalPrice} / ₹${totalPriceINR.toLocaleString()}`;
                    configTotalElement.style.transform = 'scale(1)';
                    configTotalElement.style.color = '#0C3483';
                }, 200);
            });
        });

        // Deploy Team Button
        if (deployTeamBtn) {
            deployTeamBtn.addEventListener('click', () => {
                // Collect selected services
                const selectedServices = [];
                document.querySelectorAll('.config-card.active').forEach(card => {
                    selectedServices.push(card.querySelector('.config-name').textContent);
                });

                if (selectedServices.length === 0) {
                    alert('Please select at least one service to build your plan!');
                    return;
                }

                // For now, just scroll to contact and perhaps log or alert
                // ideally this would pre-fill a form
                alert(`Excellent choice! Your managed growth configuration:\n\n${selectedServices.join('\n')}\n\nEstimated Monthly Investment: $${totalPrice}\n\nOur founders will contact you within 24 hours to begin your onboarding.`);

                // Scroll to footer contact or pricing
                document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    /* --------------------------------------------------------------------------
       Comparison Section - Cost Calculator Logic
       -------------------------------------------------------------------------- */
    const sdrSlider = document.getElementById('sdrSlider');
    if (sdrSlider) {
        const sdrCountDisplay = document.getElementById('sdrCountDisplay');
        const hiringCostDisplay = document.getElementById('hiringCost');
        const alchemyCostDisplay = document.getElementById('alchemyCost');
        const savingsAmountDisplay = document.getElementById('savingsAmount');
        const annualSavingsDisplay = document.getElementById('annualSavings');
        const hiringBar = document.getElementById('hiringBar');
        const alchemyBar = document.getElementById('alchemyBar');

        const SDR_MONTHLY_COST = 6000; // Salary + Tools + Overhead
        const ALCHEMY_MONTHLY_COST = 349;
        const MAX_SDR_COUNT = 5;
        const MAX_TOTAL_COST = SDR_MONTHLY_COST * MAX_SDR_COUNT; // $30,000 reference

        function updateComparison() {
            const count = parseInt(sdrSlider.value);
            const hiringTotal = count * SDR_MONTHLY_COST;
            const alchemyTotal = ALCHEMY_MONTHLY_COST;
            const savings = hiringTotal - alchemyTotal;
            const annual = savings * 12;

            // Update Text
            if (sdrCountDisplay) sdrCountDisplay.textContent = count;
            if (hiringCostDisplay) hiringCostDisplay.textContent = hiringTotal.toLocaleString();
            if (alchemyCostDisplay) alchemyCostDisplay.textContent = alchemyTotal.toLocaleString();
            if (savingsAmountDisplay) savingsAmountDisplay.textContent = savings.toLocaleString();
            if (annualSavingsDisplay) annualSavingsDisplay.textContent = '$' + annual.toLocaleString();

            // Update Bars
            // Calculate percentage of max possible cost
            const hHeight = (hiringTotal / MAX_TOTAL_COST) * 100;
            const aHeight = (alchemyTotal / MAX_TOTAL_COST) * 100;

            // Set styles (min 2% height for visibility)
            if (hiringBar) hiringBar.style.height = `${Math.max(hHeight, 2)}%`;
            if (alchemyBar) alchemyBar.style.height = `${Math.max(aHeight, 2)}%`;
        }

        sdrSlider.addEventListener('input', updateComparison);
        // Initialize
        updateComparison();
    }

    // =========================================================================
    // WAITLIST FORM HANDLING
    // =========================================================================
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('userEmail').value;
            const submitBtn = waitlistForm.querySelector('.mega-waitlist-submit');
            
            // Animation for feedback
            submitBtn.textContent = 'Securing Spot...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Transformation Secured! We've reserved a spot for ${email}. Our founders will reach out shortly.`);
                submitBtn.textContent = 'Access Secured';
                submitBtn.style.background = '#2ecc71'; // Green for success
                submitBtn.style.opacity = '1';
                waitlistForm.reset();
            }, 1200);
        });
    }

    // =========================================================================
    // FAQ ACCORDION LOGIC
    // =========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close others for a clean single-open behavior
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================================================
    // STATS COUNTER LOGIC (Results Bar) via IntersectionObserver
    // =========================================================================
    const statsObserverOptions = {
        threshold: 0.5
    };

    const animateValue = (el, target, isCurrency) => {
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            if (isCurrency) {
                el.textContent = '$' + (current / 1000).toFixed(0) + 'K+';
                if (target < 1000) el.textContent = '$' + current.toLocaleString();
            } else if (target === 10) {
                el.textContent = current + '×';
            } else if (el.nextElementSibling.textContent.includes('variation')) {
                el.textContent = current + '+';
            } else {
                el.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Precise final value corrections
                if (isCurrency) el.textContent = '$60K+';
                else if (target === 10) el.textContent = '10×';
                else if (el.nextElementSibling.textContent.includes('variation')) el.textContent = '50+';
                else el.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberEl = entry.target.querySelector('.stat-number');
                if (numberEl && !numberEl.classList.contains('animated')) {
                    numberEl.classList.add('animated');
                    const target = parseInt(numberEl.dataset.target);
                    const isCurrency = numberEl.dataset.isCurrency === 'true';
                    animateValue(numberEl, target, isCurrency);
                }
            }
        });
    }, statsObserverOptions);

    document.querySelectorAll('.result-stat').forEach(stat => statsObserver.observe(stat));
});

