// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 15, 10, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(210, 105, 30, 0.3)';
    } else {
        header.style.background = 'rgba(26, 15, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(139, 69, 19, 0.2)';
    }
});

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when hero section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Fade in animation on scroll
const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .about-card, .size-card, .contact-item, .process-step, .feature-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize particle animations
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 3}s`;
    });
    
    // Initialize coffee bean animations
    const coffeeBeans = document.querySelectorAll('.coffee-bean');
    coffeeBeans.forEach((bean, index) => {
        bean.style.animationDelay = `${index * 4}s`;
    });
    
    console.log('🔥 JP Coffee Factory website loaded successfully! ☕');
});

// Product size card interactions
document.querySelectorAll('.size-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('popular')) {
            this.style.transform = 'translateY(0) scale(1)';
        } else {
            this.style.transform = 'translateY(0) scale(1.05)';
        }
    });
    
    card.addEventListener('click', function() {
        const size = this.getAttribute('data-size');
        // Add click effect
        this.style.transform = 'translateY(-15px) scale(0.98)';
        setTimeout(() => {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            } else {
                this.style.transform = 'translateY(-15px) scale(1.07)';
            }
        }, 150);
        
        // You can add functionality here to handle size selection
        console.log(`Selected size: ${size}`);
    });
});

// Contact form handling with enhanced UX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const formData = new FormData(this);
        
        // Get form data
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !phone || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\s\-()]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form with animation
            this.reset();
            
            // Reset focus effects
            this.querySelectorAll('.input-focus-effect').forEach(effect => {
                effect.style.width = '0';
            });
            
        }, 2000);
    });
    
    // Enhanced input focus effects
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            const effect = this.nextElementSibling;
            if (effect && effect.classList.contains('input-focus-effect')) {
                effect.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const effect = this.nextElementSibling;
                if (effect && effect.classList.contains('input-focus-effect')) {
                    effect.style.width = '0';
                }
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.95)' : type === 'error' ? 'rgba(244, 67, 54, 0.95)' : 'rgba(33, 150, 243, 0.95)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'rgba(76, 175, 80, 0.3)' : type === 'error' ? 'rgba(244, 67, 54, 0.3)' : 'rgba(33, 150, 243, 0.3)'};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-particles .particle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced product image interaction
const productImage = document.querySelector('.product-img');
if (productImage) {
    productImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    productImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Floating icons animation
document.querySelectorAll('.floating-icon').forEach((icon, index) => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(360deg)';
        this.style.background = 'rgba(210, 105, 30, 0.4)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.background = 'rgba(210, 105, 30, 0.2)';
    });
});

// Process steps animation
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'scale(1.2) rotate(360deg)';
        stepNumber.style.background = 'linear-gradient(45deg, #F4A460, #D2691E)';
    });
    
    step.addEventListener('mouseleave', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'scale(1) rotate(0deg)';
        stepNumber.style.background = 'linear-gradient(45deg, #D2691E, #F4A460)';
    });
});

// Social media links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #92400e;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu a {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(251, 191, 36, 0.2);
        }
        
        .nav-menu a:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);


