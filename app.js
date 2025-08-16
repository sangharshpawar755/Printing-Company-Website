// PrintCraft Solutions - Advanced Industry-Level Website JavaScript

class PrintCraftAdvanced {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.sliderDots = document.querySelectorAll('.slider-dot');
        this.autoSlideInterval = null;
        this.isAutoPlaying = true;
        this.slideInterval = 5000; // Exactly 5 seconds as requested
        this.testimonialSlides = document.querySelectorAll('.testimonial-slide');
        this.currentTestimonial = 0;
        this.testimonialInterval = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.setupMobileNavigation();
            this.setupEnhancedDropdowns();
            this.setupAutoSlidingCarousel();
            this.setupSmoothScrolling();
            this.setupScrollSpy();
            this.setupAdvancedServiceCards();
            this.setupIntersectionObserver();
            this.setupCounterAnimations();
            this.setupTestimonialSlider();
            this.setupBackToTop();
            this.setupAdvancedAnimations();
            this.setupKeyboardNavigation();
            this.setupPerformanceOptimizations();
            this.isInitialized = true;
        }, 100);
    }

    // Loading Screen with Company Branding
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Hide loading screen after 1.5 seconds
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Trigger initial animations after loading
                setTimeout(() => {
                    this.triggerInitialAnimations();
                }, 300);
            }
        }, 1500);

        // Ensure body doesn't scroll during loading
        document.body.style.overflow = 'hidden';
    }

    triggerInitialAnimations() {
        // Animate hero content
        const heroElements = document.querySelectorAll('.slide.active .slide-title, .slide.active .slide-description, .slide.active .slide-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `slideInUp 1s ease-out forwards`;
            }, index * 200);
        });

        // Animate navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeInDown 0.6s ease-out forwards';
            }, index * 100);
        });
    }

    // Enhanced Mobile Navigation
    setupMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const body = document.body;

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = hamburger.classList.contains('active');
                
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (!isActive) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
                
                // Update aria attributes
                hamburger.setAttribute('aria-expanded', (!isActive).toString());
            });

            // Close mobile menu when clicking on nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Enhanced Dropdown Menu System
    setupEnhancedDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            let hoverTimeout;
            
            if (trigger && menu) {
                // Show dropdown on hover with delay
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0) scale(1)';
                });
                
                // Hide dropdown when leaving with delay
                dropdown.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px) scale(0.95)';
                    }, 150);
                });

                // Keyboard navigation support
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const isVisible = menu.style.visibility === 'visible';
                        
                        if (isVisible) {
                            menu.style.opacity = '0';
                            menu.style.visibility = 'hidden';
                            menu.style.transform = 'translateY(-10px) scale(0.95)';
                        } else {
                            menu.style.opacity = '1';
                            menu.style.visibility = 'visible';
                            menu.style.transform = 'translateY(0) scale(1)';
                            
                            // Focus first menu item
                            const firstMenuItem = menu.querySelector('a');
                            if (firstMenuItem) {
                                setTimeout(() => firstMenuItem.focus(), 100);
                            }
                        }
                    }
                });

                // Arrow key navigation in dropdown
                const menuItems = menu.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.addEventListener('keydown', (e) => {
                        let targetIndex = index;
                        
                        switch (e.key) {
                            case 'ArrowDown':
                                e.preventDefault();
                                targetIndex = (index + 1) % menuItems.length;
                                menuItems[targetIndex].focus();
                                break;
                            case 'ArrowUp':
                                e.preventDefault();
                                targetIndex = (index - 1 + menuItems.length) % menuItems.length;
                                menuItems[targetIndex].focus();
                                break;
                            case 'Escape':
                                e.preventDefault();
                                menu.style.opacity = '0';
                                menu.style.visibility = 'hidden';
                                menu.style.transform = 'translateY(-10px) scale(0.95)';
                                trigger.focus();
                                break;
                        }
                    });
                });
            }
        });
    }

    // Auto-Sliding Carousel (Exactly 5 seconds as requested) - Fixed
    setupAutoSlidingCarousel() {
        console.log('Setting up carousel...', this.slides.length, 'slides found');
        
        if (this.slides.length === 0) return;

        // Initialize first slide
        this.showSlide(0);
        
        // Start auto-slide immediately
        this.startAutoSlide();

        // Dot navigation
        this.sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Dot clicked:', index);
                this.showSlide(index);
                this.resetAutoSlide();
            });
        });

        // Arrow navigation - Fixed with proper event handlers
        const prevArrow = document.getElementById('prevSlide');
        const nextArrow = document.getElementById('nextSlide');
        
        if (prevArrow) {
            prevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Previous arrow clicked');
                this.previousSlide();
                this.resetAutoSlide();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next arrow clicked');
                this.nextSlide();
                this.resetAutoSlide();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const heroSection = document.querySelector('.hero');
            if (heroSection && (e.target === document.body || heroSection.contains(e.target))) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousSlide();
                    this.resetAutoSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                    this.resetAutoSlide();
                }
            }
        });

        // Pause auto-slide on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                console.log('Carousel paused on hover');
                this.pauseAutoSlide();
            });

            heroSection.addEventListener('mouseleave', () => {
                console.log('Carousel resumed after hover');
                this.resumeAutoSlide();
            });

            // Pause when page is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    console.log('Page hidden - carousel paused');
                    this.pauseAutoSlide();
                } else {
                    console.log('Page visible - carousel resumed');
                    this.resumeAutoSlide();
                }
            });
        }

        // Touch/swipe support for mobile
        this.setupTouchNavigation();
    }

    showSlide(index) {
        console.log('Showing slide:', index);
        
        // Hide all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (this.sliderDots[i]) {
                this.sliderDots[i].classList.remove('active');
            }
        });

        // Show target slide with animation
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            
            // Animate slide content
            const slideContent = this.slides[index].querySelectorAll('.slide-title, .slide-description, .slide-buttons');
            slideContent.forEach((el, i) => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = `slideInUp 1s ease-out ${i * 0.2}s both`;
                }, 100);
            });
        }
        
        if (this.sliderDots[index]) {
            this.sliderDots[index].classList.add('active');
        }

        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        console.log('Next slide:', nextIndex);
        this.showSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        console.log('Previous slide:', prevIndex);
        this.showSlide(prevIndex);
    }

    startAutoSlide() {
        if (this.slides.length <= 1) return;
        
        console.log('Starting auto-slide with', this.slideInterval, 'ms interval');
        
        // Clear any existing interval
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        
        this.autoSlideInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                console.log('Auto-advancing to next slide');
                this.nextSlide();
            }
        }, this.slideInterval); // Exactly 5 seconds
    }

    pauseAutoSlide() {
        console.log('Auto-slide paused');
        this.isAutoPlaying = false;
    }

    resumeAutoSlide() {
        console.log('Auto-slide resumed');
        this.isAutoPlaying = true;
    }

    resetAutoSlide() {
        console.log('Resetting auto-slide');
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        this.isAutoPlaying = true;
        this.startAutoSlide();
    }

    // Touch/Swipe Navigation for Mobile
    setupTouchNavigation() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        let startX, startY, distX, distY;
        const threshold = 100; // Minimum swipe distance

        heroSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        heroSection.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            distX = e.touches[0].clientX - startX;
            distY = e.touches[0].clientY - startY;

            // Prevent scrolling if horizontal swipe
            if (Math.abs(distX) > Math.abs(distY)) {
                e.preventDefault();
            }
        }, { passive: false });

        heroSection.addEventListener('touchend', () => {
            if (Math.abs(distX) > threshold && Math.abs(distX) > Math.abs(distY)) {
                if (distX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
                this.resetAutoSlide();
            }
            startX = startY = distX = distY = null;
        }, { passive: true });
    }

    // Enhanced Smooth Scrolling with Offset
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                if (targetId === '#' || targetId === '#top') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Advanced Scroll Spy with Active State Management
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const navLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                
                if (entry.isIntersecting && navLink) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current nav link
                    navLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Advanced Service Cards with 3D Effects
    setupAdvancedServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Enhanced 3D hover effects
            card.addEventListener('mouseenter', () => {
                this.animateCardElements(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardElements(card, false);
            });

            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                
                this.createRippleEffect(card, e);
            });

            // 3D tilt effect based on mouse position
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    animateCardElements(card, isHover) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('.service-title');
        const button = card.querySelector('.btn');

        if (isHover) {
            if (icon) icon.style.transform = 'scale(1.2) rotate(10deg)';
            if (title) title.style.color = 'var(--color-primary)';
            if (button) {
                button.style.background = 'var(--color-primary)';
                button.style.color = 'var(--color-white)';
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 6px 20px rgba(33, 128, 141, 0.4)';
            }
        } else {
            if (icon) icon.style.transform = '';
            if (title) title.style.color = '';
            if (button) {
                button.style.background = '';
                button.style.color = '';
                button.style.transform = '';
                button.style.boxShadow = '';
            }
        }
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(33, 128, 141, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

        const style = document.createElement('style');
        if (!document.getElementById('ripple-style')) {
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    // Advanced Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('service-card')) {
                        this.animateServiceCard(entry.target);
                    } else if (entry.target.classList.contains('stat-item')) {
                        this.animateStatItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.service-card, .stat-item, .certification-item, .grievance-card, .section-header');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateServiceCard(card) {
        const elements = card.querySelectorAll('.service-icon, .service-title, .service-description, .service-features, .btn');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }

    animateStatItem(item) {
        const numberEl = item.querySelector('.stat-number');
        if (numberEl) {
            this.animateCounter(numberEl);
        }
    }

    // Counter Animations for Statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString() + (target >= 1000 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + (target >= 1000 ? '+' : '');
            }
        };

        updateCounter();
    }

    // Testimonial Slider
    setupTestimonialSlider() {
        if (this.testimonialSlides.length === 0) return;

        this.showTestimonial(0);
        this.startTestimonialSlider();

        // Auto-advance testimonials
        const testimonialContainer = document.querySelector('.testimonials');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                if (this.testimonialInterval) {
                    clearInterval(this.testimonialInterval);
                }
            });

            testimonialContainer.addEventListener('mouseleave', () => {
                this.startTestimonialSlider();
            });
        }
    }

    showTestimonial(index) {
        this.testimonialSlides.forEach(slide => slide.classList.remove('active'));
        if (this.testimonialSlides[index]) {
            this.testimonialSlides[index].classList.add('active');
        }
        this.currentTestimonial = index;
    }

    startTestimonialSlider() {
        if (this.testimonialSlides.length <= 1) return;
        
        this.testimonialInterval = setInterval(() => {
            const nextIndex = (this.currentTestimonial + 1) % this.testimonialSlides.length;
            this.showTestimonial(nextIndex);
        }, 4000); // 4 seconds for testimonials
    }

    // Back to Top Button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', this.debounce(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Advanced Animations and Effects
    setupAdvancedAnimations() {
        // Parallax effect for hero section
        window.addEventListener('scroll', this.debounce(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            
            if (heroSection && scrolled < window.innerHeight) {
                const speed = scrolled * 0.3;
                heroSection.style.transform = `translateY(${speed}px)`;
            }
        }, 16)); // ~60fps

        // Header background opacity on scroll
        this.setupHeaderScrollEffect();
    }

    setupHeaderScrollEffect() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', this.debounce(() => {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.backdropFilter = 'blur(15px)';
            }
        }, 16));
    }

    // Enhanced Keyboard Navigation
    setupKeyboardNavigation() {
        // Focus management for accessibility
        document.addEventListener('keydown', (e) => {
            // Skip links functionality
            if (e.key === 'Tab' && e.target === document.body) {
                const firstFocusable = document.querySelector('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });

        // Enhanced focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Preload next slide images
        this.preloadSlideImages();
        
        // Optimize scroll listeners
        this.optimizeScrollListeners();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    preloadSlideImages() {
        // In a real implementation, preload actual slide images
        const slides = document.querySelectorAll('.slide[data-bg]');
        slides.forEach(slide => {
            const bgType = slide.getAttribute('data-bg');
            // Preload logic would go here for actual images
        });
    }

    optimizeScrollListeners() {
        // Use passive listeners where possible
        const passiveEvents = ['scroll', 'touchstart', 'touchmove'];
        passiveEvents.forEach(event => {
            document.addEventListener(event, () => {}, { passive: true });
        });
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Cleanup method
    destroy() {
        // Clear intervals
        if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
        if (this.testimonialInterval) clearInterval(this.testimonialInterval);
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Form Handling System
class FormHandler {
    constructor() {
        this.setupContactForms();
        this.setupNewsletterForm();
    }

    setupContactForms() {
        const forms = document.querySelectorAll('form[data-contact-form]');
        
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
    }

    setupNewsletterForm() {
        const newsletterForms = document.querySelectorAll('form[data-newsletter-form]');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validateForm(form)) {
            this.showErrorMessage('Please fill in all required fields correctly.');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;

        if (!this.validateEmail(email)) {
            this.showErrorMessage('Please enter a valid email address.');
            return;
        }

        // Show success message for newsletter
        this.showSuccessMessage('Thank you for subscribing! Welcome to PrintCraft Solutions newsletter.');
        form.reset();
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const bgColor = type === 'success' ? 'var(--color-success)' : 'var(--color-error)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.4s ease;
            max-width: 300px;
            font-size: 14px;
            line-height: 1.4;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 5000);
    }
}

// Accessibility Enhancer
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupAriaAttributes();
        this.setupSkipLinks();
        this.setupFocusManagement();
        this.setupScreenReaderAnnouncements();
    }

    setupAriaAttributes() {
        // Set up ARIA attributes for interactive elements
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-controls', 'nav-menu');
            
            navMenu.setAttribute('aria-labelledby', 'hamburger');
        }

        // Set up slider ARIA attributes
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
            slide.setAttribute('role', 'tabpanel');
        });

        const sliderDots = document.querySelectorAll('.slider-dot');
        sliderDots.forEach((dot, index) => {
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        });
    }

    setupSkipLinks() {
        // Add skip link for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10001;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content identifier
        const mainContent = document.querySelector('.hero') || document.querySelector('main');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('tabindex', '-1');
        }
    }

    setupFocusManagement() {
        // Enhanced focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-focus');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-focus');
        });

        // Add focus styles for keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-focus *:focus {
                outline: 2px solid var(--color-primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupScreenReaderAnnouncements() {
        // Create announcement region
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'announcer';
        document.body.appendChild(announcer);

        this.announcer = announcer;
    }

    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing PrintCraft Solutions website...');
        
        // Initialize main website functionality
        const printCraft = new PrintCraftAdvanced();
        const formHandler = new FormHandler();
        const accessibility = new AccessibilityEnhancer();

        // Make accessibility announcer globally available
        window.announceToScreenReader = (message) => {
            accessibility.announce(message);
        };

        // Add page load animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '1';
        }, 100);

        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('PrintCraft Global Error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('PrintCraft Unhandled Promise Rejection:', e.reason);
        });

        console.log('PrintCraft Solutions website initialized successfully!');

    } catch (error) {
        console.error('PrintCraft Initialization Error:', error);
    }
});

// Performance monitoring
if (typeof PerformanceObserver !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PrintCraftAdvanced,
        FormHandler,
        AccessibilityEnhancer
    };
}