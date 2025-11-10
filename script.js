// JavaScript for Llanos Auditores Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.service-card, .case-study, .benefit-item, .icon-circle'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form submission handling
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('nombre') || this.querySelector('input[placeholder*="Nombre"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('mensaje') || this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
    
    // Industry tabs functionality
    const industryTabs = document.querySelectorAll('#industryTabs button');
    
    industryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            industryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you could add logic to filter case studies based on industry
            const targetIndustry = this.getAttribute('data-bs-target');
            console.log('Filtering by industry:', targetIndustry);
        });
    });
    
    // Client logo hover effect
    const clientLogos = document.querySelectorAll('.client-logo');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });
    }
    
    // Testimonial carousel auto-play
    const testimonialCarousel = document.querySelector('#testimonialCarousel');
    if (testimonialCarousel) {
        // Auto-advance carousel every 8 seconds
        setInterval(() => {
            const activeItem = testimonialCarousel.querySelector('.carousel-item.active');
            const nextItem = activeItem.nextElementSibling || testimonialCarousel.querySelector('.carousel-item:first-child');
            
            activeItem.classList.remove('active');
            nextItem.classList.add('active');
        }, 8000);
    }
    
    // Mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} notification`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Initialize animations
    function initAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .notification {
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(style);
    }
    
    initAnimations();
    
    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
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
    
    // Apply debouncing to scroll handler
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    console.log('Llanos Auditores website loaded successfully!');
});