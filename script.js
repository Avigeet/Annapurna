// Smooth scrolling navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
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

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-count');
                const data = +counter.innerText;
                const time = value / speed;
                
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value + (value === 95 ? '%' : '');
                }
            };
            animate();
        });
    }

    // Skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger counter animation for hero stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                
                // Trigger skill bar animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.hero-stats, .skills, .service-card, .portfolio-card, .testimonial-card, .blog-card');
    animatedElements.forEach(el => observer.observe(el));

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple validation
        const requiredFields = ['name', 'email', 'services', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!formObject[field] || formObject[field].trim() === '') {
                input.style.borderColor = '#EF4444';
                isValid = false;
            } else {
                input.style.borderColor = '#E2E8F0';
            }
        });
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = this.querySelector('[name="email"]');
        if (!emailRegex.test(formObject.email)) {
            emailInput.style.borderColor = '#EF4444';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = this.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#10B981';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '#F59E0B';
                    submitButton.style.opacity = '1';
                    submitButton.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        }
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Add active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize AOS-like animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
    }

    initScrollAnimations();

    // Add search functionality for blog (if needed)
    const blogCards = document.querySelectorAll('.blog-card');
    
    function filterBlog(searchTerm) {
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm.toLowerCase()) || content.includes(searchTerm.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add typing effect to hero title (optional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize smooth scrolling polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = document.createElement('script');
        smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
        document.head.appendChild(smoothScrollPolyfill);
    }

    // Add performance optimization for scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Handle scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add error handling for image loading
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMxNi42ODYzIDMwIDEzLjUwNTQgMjguNjgzIDExLjI1IDI2LjI1QzguOTk0NjUgMjMuODE3IDcgMjAuNzM5IDcgMTcuNUM3IDE0LjI2MSA4Ljk5NDY1IDExLjE4MyAxMS4yNSA4Ljc1QzEzLjUwNTQgNi4zMTcgMTYuNjg2MyA1IDIwIDVDMjMuMzEzNyA1IDI2LjQ5NDYgNi4zMTcgMjguNzUgOC43NUMzMS4wMDUzIDExLjE4MyAzMyAxNC4yNjEgMzMgMTcuNUMzMyAyMC43MzkgMzEuMDA1MyAyMy44MTcgMjguNzUgMjYuMjVDMjYuNDk0NiAyOC42ODMgMjMuMzEzNyAzMCAyMCAzMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+Cg==';
            this.alt = 'Image not available';
        });
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563EB !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add loading screen (optional)
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
});

// Add scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563EB;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(100px)';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);
