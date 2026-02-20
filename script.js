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
    const animateOnScroll = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .step-card, .faq-item, .gallery-item, .variation-card, .benefit-card');
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
    
    // Gallery Carousel - FULLY OPTIMIZED VERSION
    const carouselTrack = document.querySelector('.gallery-track');
    const carouselItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-nav-prev');
    const nextButton = document.querySelector('.gallery-nav-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    if (carouselTrack && carouselItems.length > 0) {
        let currentIndex = 0;
        let itemsPerView = 1;
        let cachedItemWidth = 0;
        let cachedGap = 0;
        
        // CRITICAL FIX: Enable GPU acceleration on the track
        carouselTrack.style.willChange = 'transform';
        carouselTrack.style.backfaceVisibility = 'hidden';
        carouselTrack.style.perspective = '1000px';
        
        // Preload all images immediately
        carouselItems.forEach(item => {
            const img = item.querySelector('img');
            if (img && img.loading) {
                img.loading = 'eager'; // Force eager loading
            }
        });
        
        // Cache dimensions
        function cacheDimensions() {
            const item = carouselItems[0];
            if (!item) return;
            
            // Force layout recalc once
            cachedItemWidth = item.getBoundingClientRect().width;
            cachedGap = parseFloat(getComputedStyle(carouselTrack).gap) || 24;
        }
        
        // Calculate items per view
        function updateItemsPerView() {
            const width = window.innerWidth;
            itemsPerView = width >= 768 ? 2 : 1;
            cacheDimensions();
            createDots();
            updateGallery();
        }
        
        // Create dots
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const totalSlides = Math.ceil(carouselItems.length / itemsPerView);
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('gallery-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    currentIndex = Math.min(i * itemsPerView, carouselItems.length - itemsPerView);
                    updateGallery();
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update gallery - ULTRA FAST VERSION
        function updateGallery() {
            // Calculate offset using cached values
            const offset = -(currentIndex * (cachedItemWidth + cachedGap));
            
            // Use translate3d for GPU acceleration
            carouselTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
            
            // Update buttons
            const maxIndex = carouselItems.length - itemsPerView;
            if (prevButton) prevButton.disabled = currentIndex <= 0;
            if (nextButton) nextButton.disabled = currentIndex >= maxIndex;
            
            // Update dots
            const dots = document.querySelectorAll('.gallery-dot');
            const activeSlide = Math.floor(currentIndex / itemsPerView);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeSlide);
            });
        }
        
        // Navigation handlers
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex = Math.max(0, currentIndex - itemsPerView);
                    updateGallery();
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const maxIndex = carouselItems.length - itemsPerView;
                if (currentIndex < maxIndex) {
                    currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
                    updateGallery();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const maxIndex = carouselItems.length - itemsPerView;
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - itemsPerView);
                updateGallery();
            } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
                currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
                updateGallery();
            }
        });
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const maxIndex = carouselItems.length - itemsPerView;
            
            if (touchEndX < touchStartX - 50 && currentIndex < maxIndex) {
                currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
                updateGallery();
            } else if (touchEndX > touchStartX + 50 && currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - itemsPerView);
                updateGallery();
            }
        }, { passive: true });
        
        // Initialize
        updateItemsPerView();
        
        // Optimized resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const oldItemsPerView = itemsPerView;
                updateItemsPerView();
                if (oldItemsPerView !== itemsPerView) {
                    currentIndex = 0;
                }
            }, 250);
        });
        
        console.log('✅ Gallery carousel initialized (ULTRA OPTIMIZED)');
    }
    
    // Fullscreen Lightbox
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <button class="lightbox-close" aria-label="Close lightbox">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-nav lightbox-next" aria-label="Next image">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <div class="lightbox-counter"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    
    let currentLightboxIndex = 0;
    const allImages = Array.from(document.querySelectorAll('.gallery-single img'));
    
    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        history.pushState({ lightboxOpen: true }, '');
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (history.state && history.state.lightboxOpen) {
            history.back();
        }
    }
    
    window.addEventListener('popstate', (e) => {
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    function updateLightboxImage() {
        if (allImages[currentLightboxIndex]) {
            lightboxImage.src = allImages[currentLightboxIndex].src;
            lightboxImage.alt = allImages[currentLightboxIndex].alt;
            lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${allImages.length}`;
            
            lightboxPrev.disabled = currentLightboxIndex === 0;
            lightboxNext.disabled = currentLightboxIndex === allImages.length - 1;
        }
    }
    
    function showPrevImage() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            updateLightboxImage();
        }
    }
    
    function showNextImage() {
        if (currentLightboxIndex < allImages.length - 1) {
            currentLightboxIndex++;
            updateLightboxImage();
        }
    }
    
    // Add click handlers to gallery images
    allImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
    
    console.log('✅ Lightbox initialized');

    // ── Tagline auto-fit ─────────────────────────────────────────────────────
    // Keeps "Oven Cleaning / and More" at exactly 2 lines by shrinking the
    // font whenever the element's height exceeds 2 lines at the current size.

    const tagline = document.querySelector('.header-tagline');

    function fitTagline() {
        if (!tagline) return;
        // Clear any inline override so we read the CSS-defined size
        tagline.style.fontSize = '';
        const maxPx = parseFloat(getComputedStyle(tagline).fontSize) || 48;
        const lineHeight = parseFloat(getComputedStyle(tagline).lineHeight);
        const twoLineHeight = lineHeight * 2;
        let size = maxPx;
        // Step down until it fits in 2 lines
        while (tagline.scrollHeight > twoLineHeight + 2 && size > 8) {
            size -= 0.5;
            tagline.style.fontSize = size + 'px';
        }
    }

    fitTagline();

    const taglineObserver = new ResizeObserver(fitTagline);
    if (tagline) taglineObserver.observe(tagline.parentElement);
    // ─────────────────────────────────────────────────────────────────────────

}); // End of DOMContentLoaded