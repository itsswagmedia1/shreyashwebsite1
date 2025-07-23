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
        const heroLogo = document.querySelector('.hero-logo');
        
        if (heroText && scrolled < window.innerHeight) {
            const speed = scrolled * 0.1;
            heroText.style.transform = `translateY(${speed}px)`;
        }
        
        if (heroLogo && scrolled < window.innerHeight) {
            const speed = scrolled * 0.05;
            heroLogo.style.transform = `translateY(${speed}px) scale(${1 + scrolled * 0.0001})`;
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
        const heroLogo = document.querySelector('.hero-logo');
        const heroNavigation = document.querySelector('.hero-navigation');
        const servicesPreview = document.querySelector('.services-preview');

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

        if (heroLogo) {
            heroLogo.style.opacity = '0';
            heroLogo.style.transform = 'scale(0.8) translateY(-20px)';
            
            setTimeout(() => {
                heroLogo.style.transition = 'all 0.8s ease-out';
                heroLogo.style.opacity = '1';
                heroLogo.style.transform = 'scale(1) translateY(0)';
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

        if (servicesPreview) {
            servicesPreview.style.opacity = '0';
            servicesPreview.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                servicesPreview.style.transition = 'all 0.8s ease-out';
                servicesPreview.style.opacity = '1';
                servicesPreview.style.transform = 'translateY(0)';
            }, 800);
        }
    }

    // Run animations after a short delay
    setTimeout(animateOnLoad, 100);

    // Button hover effects
    const ctaButton = document.querySelector('.btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }

    // Add pulse animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translateY(-3px) scale(1); }
            50% { transform: translateY(-3px) scale(1.02); }
            100% { transform: translateY(-3px) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Service items hover effect
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mobile menu toggle (for future mobile menu implementation)
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    // Expose functions globally if needed
    window.ElectronovaApp = {
        toggleMobileMenu: toggleMobileMenu
    };

    console.log('Electronova Systems - Page loaded successfully');
});