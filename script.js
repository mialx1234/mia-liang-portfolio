/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HERO ANIMATION TRIGGER
    // The CSS handles the text slide-up. 
    // This JS ensures the image fades in smoothly after the text.
    const heroImage = document.querySelector('header img');
    if(heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 800); // 800ms delay matches the CSS text animation timing
    }

    // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
    // This makes sections slide up and fade in when they enter the viewport
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly for smoother feel
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. PARALLAX EFFECT FOR HERO IMAGE
    // Makes the image move slightly based on mouse position for a 3D feel
    const header = document.querySelector('header');
    
    if (header && heroImage) {
        header.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            
            // Only apply this effect on desktop (screens wider than 768px)
            if (window.innerWidth > 768) {
                heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
        });

        // Reset position when mouse leaves
        header.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                heroImage.style.transform = `translateX(0) translateY(0)`;
            }
        });
    }

    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
