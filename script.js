document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations (Simple Fade) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

});

// --- Auto-Hide Navbar ---
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.exp-row, .exp-card, .hero-text, .tech-grid span');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// --- Click Spark Effect ---
document.addEventListener('click', (e) => {
    const sparkCount = 30;

    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        document.body.appendChild(spark);

        // Position at click
        spark.style.left = `${e.pageX}px`;
        spark.style.top = `${e.pageY}px`;

        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 40; // Explosion radius increased
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        // Animate
        const duration = Math.random() * 0.5 + 0.3; // 0.3s to 0.8s

        spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        // Cleanup
        setTimeout(() => {
            spark.remove();
        }, duration * 1000);
    }
});

