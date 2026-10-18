document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Auto-Hide Navbar ---
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            lastScrollY = window.scrollY;
        }, { passive: true });
    }

    // --- Parallax Engine ---
    const parallaxElements = document.querySelectorAll('[data-speed]');
    let requestAnimationFrameId = null;
    let currentScrollY = window.scrollY;

    const updateParallax = () => {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed'));
            
            if (el.classList.contains('bg-grid') || el.classList.contains('orb')) {
                // Absolute parallax for backgrounds based purely on scroll depth
                const yPos = -(currentScrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            } else {
                // Relative parallax for content blocks
                const rect = el.getBoundingClientRect();
                const elementCenterY = rect.top + rect.height / 2;
                const viewportCenterY = window.innerHeight / 2;
                
                // How far is element from center of screen?
                const distanceFromCenter = elementCenterY - viewportCenterY;
                
                // The offset is a fraction of that distance
                const offset = distanceFromCenter * (1 - speed);
                el.style.transform = `translateY(${offset}px)`;
            }
        });
        requestAnimationFrameId = null;
    };

    window.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
        if (!requestAnimationFrameId) {
            requestAnimationFrameId = window.requestAnimationFrame(updateParallax);
        }
    }, { passive: true });
    
    // Initial call to set positions
    updateParallax();
});
