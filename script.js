// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCarousel();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Carousel functionality
function initCarousel() {
    const carCards = document.querySelectorAll('.car-card');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Auto-rotate carousel
    function nextSlide() {
        carCards[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % carCards.length;
        
        carCards[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    // Manual navigation with indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            carCards[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            carCards[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
        });
    });

    // Auto-rotate every 5 seconds
    setInterval(nextSlide, 5000);
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .vehicle-card, .service-card, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Contact form submitted successfully!');
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Newsletter subscription successful!');
        });
    }
}

function handleFormSubmission(form, successMessage) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification(successMessage, 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: type === 'success' ? '#0a0a0a' : '#ffffff',
        background: type === 'success' ? '#D4AF37' : '#2a2a2a',
        border: `2px solid ${type === 'success' ? '#B8860B' : '#D4AF37'}`,
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
        fontWeight: '600'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Animation system
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.feature-card, .vehicle-card, .service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Vehicle card interactions
function initVehicleInteractions() {
    document.querySelectorAll('.vehicle-card').forEach(card => {
        const overlay = card.querySelector('.vehicle-overlay');
        const viewBtn = overlay.querySelector('.btn');
        
        // Add click event to view details button
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const vehicleName = card.querySelector('h3').textContent;
            showNotification(`Viewing details for ${vehicleName}`, 'info');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Statistics counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        
        if (elapsed < duration) {
            current += increment;
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Search functionality for inventory
function initInventorySearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search vehicles...';
    searchInput.className = 'inventory-search';
    
    // Style the search input
    Object.assign(searchInput.style, {
        width: '100%',
        maxWidth: '400px',
        padding: '15px 20px',
        borderRadius: '25px',
        border: '2px solid var(--accent-black)',
        background: 'var(--secondary-black)',
        color: 'var(--text-white)',
        fontSize: '1rem',
        marginBottom: '2rem'
    });
    
    // Insert search input before inventory grid
    const inventorySection = document.querySelector('.inventory .container');
    const inventoryTitle = inventorySection.querySelector('.section-title');
    inventorySection.insertBefore(searchInput, inventoryTitle.nextSibling);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const vehicleCards = document.querySelectorAll('.vehicle-card');
        
        vehicleCards.forEach(card => {
            const vehicleName = card.querySelector('h3').textContent.toLowerCase();
            const vehicleSpecs = card.querySelector('.vehicle-specs').textContent.toLowerCase();
            
            if (vehicleName.includes(searchTerm) || vehicleSpecs.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Test drive scheduling modal
function initTestDriveModal() {
    const testDriveBtn = document.querySelector('.btn-secondary');
    
    if (testDriveBtn) {
        testDriveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showTestDriveModal();
        });
    }
}

function showTestDriveModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Schedule Test Drive</h3>
                <button class="modal-close">&times;</button>
            </div>
            <form class="test-drive-form">
                <div class="form-group">
                    <input type="text" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <input type="tel" placeholder="Your Phone" required>
                </div>
                <div class="form-group">
                    <select required>
                        <option value="">Select Vehicle</option>
                        <option value="sedan">Luxury Sedan</option>
                        <option value="sports">Sports Coupe</option>
                        <option value="suv">Luxury SUV</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <input type="time" required>
                </div>
                <button type="submit" class="btn btn-primary">Schedule Test Drive</button>
            </form>
        </div>
    `;
    
    // Style the modal
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    // Form submission
    const form = modal.querySelector('.test-drive-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Test drive scheduled successfully!', 'success');
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initVehicleInteractions();
    initStatsCounter();
    initInventorySearch();
    initTestDriveModal();
    initParallax();
});

// Add CSS for additional features
const additionalStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-overlay {
        backdrop-filter: blur(10px);
    }
    
    .modal-content {
        background: var(--accent-black);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        border: 2px solid var(--primary-gold);
        box-shadow: var(--shadow-gold);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--primary-gold);
        padding-bottom: 1rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--primary-gold);
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        background: var(--primary-gold);
        color: var(--text-dark);
    }
    
    .test-drive-form .form-group {
        margin-bottom: 1.5rem;
    }
    
    .test-drive-form input,
    .test-drive-form select {
        width: 100%;
        padding: 1rem;
        background: var(--secondary-black);
        border: 1px solid var(--accent-black);
        border-radius: 10px;
        color: var(--text-white);
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .test-drive-form input:focus,
    .test-drive-form select:focus {
        outline: none;
        border-color: var(--primary-gold);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
    
    .inventory-search:focus {
        outline: none;
        border-color: var(--primary-gold);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
