// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLanguageSwitcher();
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initModals();
    initAnimations();
    initSmoothScrolling();
});

// Language Switcher
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Store preference
            localStorage.setItem('preferred-language', lang);
        });
    });
}

function setLanguage(lang) {
    // Update all elements with data attributes
    document.querySelectorAll('[data-en], [data-ar], [data-ja]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update document direction for Arabic
    if (lang === 'ar') {
        document.body.setAttribute('data-lang', 'ar');
    } else {
        document.body.removeAttribute('data-lang');
    }
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');

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
    document.querySelectorAll('.service-card, .testimonial, .comparison-item').forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initFormHandling() {
    const quickForm = document.getElementById('quickForm');
    const quoteForm = document.getElementById('quoteForm');
    const consultationForm = document.getElementById('consultationForm');

    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Quote request sent successfully!');
        });
    }

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Quote request sent successfully!');
            closeModal('quoteModal');
        });
    }

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'Consultation booked successfully!');
            closeModal('consultationModal');
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

// Modal functionality
function initModals() {
    // Close modals when clicking on X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

function showQuoteForm() {
    const modal = document.getElementById('quoteModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showConsultationForm() {
    const modal = document.getElementById('consultationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showServiceForm(serviceType) {
    // Pre-fill the service selection in the quote form
    const modal = document.getElementById('quoteModal');
    const serviceSelect = modal.querySelector('select');
    
    if (serviceSelect) {
        serviceSelect.value = serviceType;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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
    document.querySelectorAll('.service-card, .testimonial, .comparison-item').forEach((card, index) => {
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

// Service-specific form handling
function handleServiceForm(serviceType) {
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    let serviceName = '';
    
    switch(serviceType) {
        case 'new-car':
            serviceName = currentLang === 'ar' ? 'سيارة جديدة' : 
                         currentLang === 'ja' ? '新車' : 'New Car';
            break;
        case 'used-car':
            serviceName = currentLang === 'ar' ? 'سيارة مستعملة' : 
                         currentLang === 'ja' ? '中古車' : 'Used Car';
            break;
        case 'financing':
            serviceName = currentLang === 'ar' ? 'التمويل' : 
                         currentLang === 'ja' ? '資金調達' : 'Financing';
            break;
        case 'maintenance':
            serviceName = currentLang === 'ar' ? 'الصيانة' : 
                         currentLang === 'ja' ? 'メンテナンス' : 'Maintenance';
            break;
    }
    
    showServiceForm(serviceType);
    
    // Show notification
    const message = currentLang === 'ar' ? `تم فتح نموذج ${serviceName}` :
                   currentLang === 'ja' ? `${serviceName}フォームを開きました` :
                   `Opened ${serviceName} form`;
    showNotification(message, 'info');
}

// WhatsApp integration
function openWhatsApp(phone, message = '') {
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// SMS integration
function openSMS(phone, message = '') {
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl);
}

// Email integration
function openEmail(email, subject = '', body = '') {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
}

// Contact action handlers
function contactViaWhatsApp(phone, name = '') {
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    let message = '';
    
    if (currentLang === 'ar') {
        message = `مرحباً، أنا ${name} وأود الاستفسار عن خدمات MIRAI للسيارات.`;
    } else if (currentLang === 'ja') {
        message = `こんにちは、私は${name}で、MIRAIの自動車サービスについてお問い合わせしたいです。`;
    } else {
        message = `Hello, I'm ${name} and I'd like to inquire about MIRAI's automotive services.`;
    }
    
    openWhatsApp(phone, message);
}

function contactViaSMS(phone, name = '') {
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    let message = '';
    
    if (currentLang === 'ar') {
        message = `مرحباً، أنا ${name} وأود الاستفسار عن خدمات MIRAI للسيارات.`;
    } else if (currentLang === 'ja') {
        message = `こんにちは、私は${name}で、MIRAIの自動車サービスについてお問い合わせしたいです。`;
    } else {
        message = `Hello, I'm ${name} and I'd like to inquire about MIRAI's automotive services.`;
    }
    
    openSMS(phone, message);
}

function contactViaEmail(name = '') {
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    let subject = '';
    let body = '';
    
    if (currentLang === 'ar') {
        subject = 'استفسار عن خدمات MIRAI للسيارات';
        body = `مرحباً،\n\nأنا ${name} وأود الاستفسار عن خدماتكم.\n\nشكراً لكم.`;
    } else if (currentLang === 'ja') {
        subject = 'MIRAI自動車サービスについてのお問い合わせ';
        body = `こんにちは、\n\n私は${name}で、あなたのサービスについてお問い合わせしたいです。\n\nありがとうございます。`;
    } else {
        subject = 'Inquiry about MIRAI Automotive Services';
        body = `Hello,\n\nI'm ${name} and I'd like to inquire about your services.\n\nThank you.`;
    }
    
    openEmail('miraiboeki@gmail.com', subject, body);
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
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
    
    .notification {
        font-family: inherit;
    }
    
    /* RTL specific adjustments */
    [data-lang="ar"] .service-card {
        text-align: right;
    }
    
    [data-lang="ar"] .service-header {
        text-align: center;
    }
    
    [data-lang="ar"] .service-cta {
        text-align: center;
    }
    
    /* Japanese specific adjustments */
    [data-lang="ja"] .service-card {
        line-height: 1.8;
    }
    
    [data-lang="ja"] .hero-title {
        line-height: 1.3;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
