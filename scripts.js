        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            
            // Sticky Header Functionality
            const stickyHeader = document.getElementById('stickyHeader');
            
            function handleScroll() {
                const scrollPosition = window.scrollY;
                
                if (scrollPosition > 100) {
                    stickyHeader.classList.add('visible');
                } else {
                    stickyHeader.classList.remove('visible');
                }
            }

            // Throttle scroll events for better performance
            let ticking = false;
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(handleScroll);
                    ticking = true;
                }
            }

            window.addEventListener('scroll', function() {
                requestTick();
                ticking = false;
            });

            // Smooth scrolling for navigation links
            const navigationLinks = document.querySelectorAll('a[href^="#"]');
            
            navigationLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        const headerOffset = 80; // Account for sticky header
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add active class to current navigation item
            const navLinks = document.querySelectorAll('.hero-nav a, .navbar-sticky a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                });
            });

            // Intersection Observer for section highlighting
            const sections = document.querySelectorAll('section[id]');
            const navItems = document.querySelectorAll('.hero-nav a, .navbar-sticky a');

            const observerOptions = {
                threshold: 0.3,
                rootMargin: '-100px 0px -100px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute('id');
                        
                        // Remove active class from all nav items
                        navItems.forEach(item => {
                            item.classList.remove('active');
                        });
                        
                        // Add active class to corresponding nav items
                        const correspondingNavItems = document.querySelectorAll(`a[href="#${currentId}"]`);
                        correspondingNavItems.forEach(item => {
                            item.classList.add('active');
                        });
                    }
                });
            }, observerOptions);

            // Observe all sections
            sections.forEach(section => {
                observer.observe(section);
            });

            // Video background error handling
            const heroVideo = document.querySelector('.hero-video');
            
            if (heroVideo) {
                heroVideo.addEventListener('loadeddata', function() {
                    console.log('Video loaded successfully');
                });

                heroVideo.addEventListener('error', function(e) {
                    console.log('Video failed to load:', e);
                    // Fallback: add a background image or color
                    const hero = document.querySelector('.hero');
                    if (hero) {
                        hero.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
                    }
                });
            }

            // Parallax effect for hero content (subtle)
            function handleParallax() {
                const scrolled = window.pageYOffset;
                const heroText = document.querySelector('.hero-text');
                const centerLogo = document.querySelector('.center-logo-container');
                
                if (heroText && scrolled < window.innerHeight) {
                    const speed = scrolled * 0.1;
                    heroText.style.transform = `translateY(${speed}px)`;
                }
                
                if (centerLogo && scrolled < window.innerHeight) {
                    const speed = scrolled * 0.05;
                    centerLogo.style.transform = `translateY(${speed}px) scale(${1 + scrolled * 0.0001})`;
                }
            }

            // Throttled parallax scroll handler
            let parallaxTicking = false;
            function requestParallaxTick() {
                if (!parallaxTicking) {
                    requestAnimationFrame(handleParallax);
                    parallaxTicking = true;
                }
            }

            window.addEventListener('scroll', function() {
                requestParallaxTick();
                parallaxTicking = false;
            });

            // Animate elements on page load
            function animateOnLoad() {
                const heroText = document.querySelector('.hero-text');
                const centerLogo = document.querySelector('.center-logo-container');
                const heroNavigation = document.querySelector('.hero-navigation');

                // Add animation classes or styles
                if (heroText) {
                    heroText.style.opacity = '0';
                    heroText.style.transform = 'translateY(50px)';
                    
                    setTimeout(() => {
                        heroText.style.transition = 'all 1s ease-out';
                        heroText.style.opacity = '1';
                        heroText.style.transform = 'translateY(0)';
                    }, 500);
                }

                if (centerLogo) {
                    centerLogo.style.opacity = '0';
                    centerLogo.style.transform = 'scale(0.8) translateY(-20px)';
                    
                    setTimeout(() => {
                        centerLogo.style.transition = 'all 0.8s ease-out';
                        centerLogo.style.opacity = '1';
                        centerLogo.style.transform = 'scale(1) translateY(0)';
                    }, 200);
                }

                if (heroNavigation) {
                    heroNavigation.style.opacity = '0';
                    heroNavigation.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        heroNavigation.style.transition = 'all 0.6s ease-out';
                        heroNavigation.style.opacity = '1';
                        heroNavigation.style.transform = 'translateY(0)';
                    }, 100);
                }
            }

            // Run animations after a short delay
            setTimeout(animateOnLoad, 100);

            // Button hover effects
            const ctaButtons = document.querySelectorAll('.btn');
            
            ctaButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.animation = 'pulse 1s infinite';
                });

                button.addEventListener('mouseleave', function() {
                    this.style.animation = 'none';
                });
            });
        });












// Services Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services');
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section header
                entry.target.querySelector('.section-title').style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.querySelector('.section-divider').style.animation = 'scaleX 0.8s ease-out forwards 0.3s';
                entry.target.querySelector('.section-subtitle').style.animation = 'fadeIn 0.8s ease-out forwards 0.5s';
                
                // Animate service cards with staggered delay
                const cards = entry.target.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    card.style.animation = `fadeInUp 0.8s ease-out forwards ${0.7 + (index * 0.15)}s`;
                    card.style.opacity = '0';
                });
            }
        });
    }, { threshold: 0.1 });
    
    if (servicesSection) {
        observer.observe(servicesSection);
    }
    
    // Add animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleX {
            from {
                transform: scaleX(0);
                opacity: 0;
            }
            to {
                transform: scaleX(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .section-title {
            opacity: 0;
        }
        
        .section-divider {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: center;
        }
        
        .section-subtitle {
            opacity: 0;
        }
        
        .service-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});








// Testimonials Slider Animation
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSection = document.querySelector('.testimonials');
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Set initial positions
    function setupSlider() {
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
        track.style.width = `${cardWidth * cards.length}px`;
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
    }
    
    // Slide to next testimonial
    function slideToNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section header
                entry.target.querySelector('.section-title').style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.querySelector('.section-divider').style.animation = 'scaleX 0.8s ease-out forwards 0.3s';
                entry.target.querySelector('.section-subtitle').style.animation = 'fadeIn 0.8s ease-out forwards 0.5s';
                
                // Setup slider and start auto-slide
                setupSlider();
                setInterval(slideToNext, 5000);
            }
        });
    }, { threshold: 0.1 });
    
    if (testimonialsSection) {
        observer.observe(testimonialsSection);
    }
    
    // Add animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleX {
            from {
                transform: scaleX(0);
                opacity: 0;
            }
            to {
                transform: scaleX(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .section-title {
            opacity: 0;
        }
        
        .section-divider {
            opacity: 0;
            transform: scaleX(0);
            transform-origin: center;
        }
        
        .section-subtitle {
            opacity: 0;
        }
        
        .testimonial-card {
            opacity: 0;
            animation: fadeIn 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Handle window resize
    window.addEventListener('resize', setupSlider);
});

















document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    let interval;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function startSlider() {
        interval = setInterval(nextTestimonial, 5000);
    }
    
    function resetInterval() {
        clearInterval(interval);
        startSlider();
    }
    
    // Click events for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            resetInterval();
        });
    });
    
    // Start the slider
    showTestimonial(0);
    startSlider();
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    slider.addEventListener('mouseleave', () => {
        resetInterval();
    });
});












// Bottom Navigation Functionality
const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');

// Highlight current page in bottom nav
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    bottomNavItems.forEach(item => {
        const href = item.getAttribute('href');
        const linkPage = href.includes('.html') ? href : '';
        
        if (currentPage === linkPage || 
            (currentPage === 'index.html' && href === '#services')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize and add event listeners
bottomNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            // For on-page anchors, let the default behavior handle it
            return;
        }
        
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Remove active class from all items
        bottomNavItems.forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Navigate to the new page after a slight delay for visual feedback
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Highlight current page on load
document.addEventListener('DOMContentLoaded', highlightCurrentPage);
window.addEventListener('popstate', highlightCurrentPage);





// Bottom Navigation Functionality
const navLinks = document.querySelectorAll('.nav-link');
const bottomNavWrapper = document.querySelector('.bottom-nav-wrapper');

// Show/hide on scroll
let lastScrollPosition = 0;
const scrollThreshold = 100;

function handleScroll() {
    const currentScrollPosition = window.scrollY;
    
    if (currentScrollPosition > scrollThreshold && currentScrollPosition > lastScrollPosition) {
        // Scrolling down - show nav
        bottomNavWrapper.classList.add('visible');
    } else if (currentScrollPosition < lastScrollPosition) {
        // Scrolling up - keep visible
        bottomNavWrapper.classList.add('visible');
    }
    
    lastScrollPosition = currentScrollPosition;
}

// Highlight current page
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = 
            (currentPage === 'index.html' && href === '#services') ||
            (href.includes('.html') && currentPage === href);
            
        link.classList.toggle('active', isActive);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentNav();
    
    // Show nav after slight delay on page load
    setTimeout(() => {
        if (window.scrollY > scrollThreshold) {
            bottomNavWrapper.classList.add('visible');
        }
    }, 1500);
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('popstate', highlightCurrentNav);

// Add click handlers
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.getAttribute('href').includes('.html')) return;
        
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 300);
    });
});








