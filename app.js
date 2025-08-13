// Smooth scrolling for contact button
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for contact buttons
    const contactBtns = document.querySelectorAll('a[href="#contact"]');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#contact');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.car-card, .service-item, .contact-item, .about-text');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Car card hover effects with enhanced interactivity
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 40px 80px rgba(187, 134, 252, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 30px 60px rgba(187, 134, 252, 0.2)';
        });
    });

    // Enhanced contact button effects
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(btn => {
        // Add ripple effect on click
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
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
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Magnetic effect for contact buttons
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translateY(-2px) translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) translate(0, 0)';
        });
    });

    // Service items hover enhancement
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.filter = 'grayscale(0%) brightness(1) invert(0)';
            
            // Add subtle glow effect
            this.style.boxShadow = '0 25px 50px rgba(187, 134, 252, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = 'grayscale(100%) brightness(0) invert(1)';
            
            this.style.boxShadow = '0 20px 40px rgba(187, 134, 252, 0.1)';
        });
    });

    // Parallax effect for hero section
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroContent = document.querySelector('.hero-content');

        if (heroImage && scrolled < window.innerHeight) {
            const speed = scrolled * 0.5;
            heroImage.style.transform = `translateY(${speed}px)`;
            
            // Fade out hero content as user scrolls
            const opacity = 1 - (scrolled / window.innerHeight);
            heroContent.style.opacity = Math.max(0, opacity);
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .contact-btn {
            position: relative;
            overflow: hidden;
        }
        
        /* Enhance scroll indicator animation */
        .scroll-arrow {
            animation: bounce 2s infinite, pulse 3s infinite alternate;
        }
        
        @keyframes pulse {
            0% {
                opacity: 0.6;
            }
            100% {
                opacity: 1;
            }
        }
        
        /* Custom cursor for interactive elements */
        .car-card, .contact-btn, .service-item {
            cursor: pointer;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
            transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
        }
        
        /* Loading animation for images */
        .car-image img {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .car-image img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Image loading animation
    const images = document.querySelectorAll('.car-image img, .hero-image');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // Enhanced scroll indicator behavior
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const opacity = 1 - (scrolled / (window.innerHeight * 0.3));
            scrollIndicator.style.opacity = Math.max(0, opacity);
        });

        // Click handler for scroll indicator
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add luxury loading effect
    function addLoadingAnimation() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    }

    addLoadingAnimation();

    // Contact form animation (if phone link is clicked)
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            // Add a subtle success animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    console.log('Prestige Automotive - Luxury experience initialized');
});