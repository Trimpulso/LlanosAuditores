// LLANOS AUDITORES - JAVASCRIPT FUNCTIONALITY
// Based on Contawork interactive features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    // initTypingAnimation(); // Removed - using static list instead
    initScrollAnimations();
    initContactForm();
    initTestimonialCarousel();
    initServiceCards();
    initPlanCards();
    initSmoothScrolling();
    
    console.log('Llanos Auditores website loaded successfully');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.header-fixed');
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                navToggler.click();
            }
        });
    });
    
    // Active navigation highlight
    window.addEventListener('scroll', updateActiveNavigation);
    
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = '';
    
    function typeAnimation() {
        if (wordIndex < words.length) {
            const fullWord = words[wordIndex];
            
            if (isDeleting) {
                currentWord = fullWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentWord = fullWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingElement.textContent = currentWord;
            
            let typeSpeed = 150;
            
            if (isDeleting) {
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === fullWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(typeAnimation, typeSpeed);
        }
    }
    
    // Start the animation
    setTimeout(typeAnimation, 1000);
}

// Scroll animations
function initScrollAnimations() {
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
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .plan-card, .benefit-item, .testimonial-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Inicializar EmailJS
    emailjs.init("Uj_crn3Kt1Gl6rP");
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error classes
        field.classList.remove('is-invalid');
        removeErrorMessage(field);
        
        // Validate required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Este campo es obligatorio');
            return false;
        }
        
        // Validate email
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Ingresa un email válido');
                return false;
            }
        }
        
        // Validate phone
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 8) {
                showFieldError(field, 'Ingresa un teléfono válido');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function clearError(e) {
        const field = e.target;
        field.classList.remove('is-invalid');
        removeErrorMessage(field);
    }
    
    function handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData);
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Por favor corrige los errores en el formulario', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Preparar datos para EmailJS
        const templateParams = {
            to_email: "job.llanos@gmail.com",
            from_email: formValues.email,
            from_name: formValues.nombre,
            subject: `Nueva Cotización: ${formValues.empresa}`,
            cliente_nombre: formValues.nombre,
            cliente_email: formValues.email,
            cliente_telefono: formValues.telefono,
            empresa_nombre: formValues.empresa,
            plan_interes: formValues.plan,
            mensaje_cliente: formValues.mensaje || "Sin mensaje adicional",
            fecha_envio: new Date().toLocaleDateString('es-CL'),
            hora_envio: new Date().toLocaleTimeString('es-CL')
        };
        
        // Enviar email con EmailJS
        emailjs.send("service_qin2chu", "template_kx1lyc", templateParams)
            .then(function(response) {
                console.log('✅ Email enviado:', response);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                
                // Show success message
                showNotification('¡Cotización enviada correctamente! Nos contactaremos contigo pronto.', 'success');
                
            }, function(error) {
                console.error('❌ Error al enviar:', error);
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                
                // Show error message
                showNotification('Hubo un error al enviar tu cotización. Por favor intenta de nuevo.', 'error');
            });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 1rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #10b981';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Testimonial carousel
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (!carousel || testimonials.length === 0) return;
    
    let currentIndex = 0;
    const testimonialCount = testimonials.length;
    
    // Create carousel controls
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    carouselContainer.style.cssText = 'position: relative; overflow: hidden;';
    
    const carouselTrack = document.createElement('div');
    carouselTrack.className = 'carousel-track';
    carouselTrack.style.cssText = `
        display: flex;
        transition: transform 0.5s ease;
        width: ${testimonialCount * 100}%;
    `;
    
    // Move testimonials to track
    testimonials.forEach(testimonial => {
        testimonial.style.flex = '0 0 100%';
        carouselTrack.appendChild(testimonial);
    });
    
    carouselContainer.appendChild(carouselTrack);
    carousel.appendChild(carouselContainer);
    
    // Create dots navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';
    dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        gap: 0.5rem;
    `;
    
    for (let i = 0; i < testimonialCount; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: ${i === 0 ? '#1e40af' : '#cbd5e1'};
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    carousel.appendChild(dotsContainer);
    
    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transform = `translateX(-${index * (100 / testimonialCount)}%)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.style.background = i === index ? '#1e40af' : '#cbd5e1';
            dot.className = `carousel-dot ${i === index ? 'active' : ''}`;
        });
    }
    
    // Auto-play carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCount;
        goToSlide(currentIndex);
    }, 5000);
}

// Service cards interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Plan cards interaction
function initPlanCards() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('plan-featured')) {
                this.style.borderColor = '#f59e0b';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('plan-featured')) {
                this.style.borderColor = 'transparent';
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report Core Web Vitals
        if ('web-vitals' in window) {
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;
            
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        }
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Add CSS for animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #6b7280;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        color: #374151;
    }
    
    .is-invalid {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25) !important;
    }
    
    .invalid-feedback {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(additionalStyles);