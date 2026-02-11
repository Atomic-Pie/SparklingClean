// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const body = document.body;
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const header = document.querySelector('.header');

    // Toggle mobile menu
    function toggleMobileMenu() {
        body.classList.toggle('menu-open');
    }

    // Event listeners for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', toggleMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
        });
    });

    // Sticky header on scroll
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            // Add shadow when scrolled
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateOnScroll = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .step-card, .faq-item');
    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add staggered delay to grid items
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const whyCards = document.querySelectorAll('.why-card');
    whyCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Handle ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        }
    });

    // Optional: Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < 600) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Add animation to hero section on load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-trust');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    console.log('Sparkling Oven website initialized successfully! 🧹✨');
    
}); // End of DOMContentLoaded