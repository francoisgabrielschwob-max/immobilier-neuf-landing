// ====================================
// NAVIGATION SCROLL & MOBILE MENU
// ====================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ====================================
// SMOOTH SCROLL
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// SCROLL ANIMATIONS
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const elementsToAnimate = document.querySelectorAll(`
    .editorial-content,
    .editorial-image,
    .expertise-card,
    .territory-card,
    .process-step,
    .cta-content
`);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animateOnScroll.observe(el);
});

// ====================================
// HERO PARALLAX EFFECT
// ====================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
        const parallaxSpeed = scrollPosition * 0.5;
        heroContent.style.transform = `translateY(${parallaxSpeed}px)`;
        hero.style.opacity = 1 - (scrollPosition / window.innerHeight);
    }
});

// ====================================
// SCROLL INDICATOR
// ====================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const editorialSection = document.querySelector('.editorial');
        if (editorialSection) {
            editorialSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ====================================
// CITY TAGS INTERACTION
// ====================================

const cityTags = document.querySelectorAll('.city-tag');

cityTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Add a subtle pulse effect
        tag.style.transform = 'scale(1.1)';
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 200);
    });
});

// ====================================
// BOOKING BUTTON
// ====================================

const bookingBtn = document.getElementById('bookingBtn');

// TODO: Replace this URL with your actual Microsoft Booking link
const BOOKING_URL = 'https://outlook.office365.com/book/VOTRE_LIEN_BOOKING';

if (bookingBtn) {
    bookingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if booking URL is set
        if (BOOKING_URL.includes('VOTRE_LIEN_BOOKING')) {
            alert('🔗 Veuillez configurer votre lien Microsoft Booking dans le fichier js/main.js\n\nRemplacez BOOKING_URL par votre lien de réservation.');
            return;
        }
        
        // Open booking page in new tab
        window.open(BOOKING_URL, '_blank');
    });
}

// ====================================
// EXPERTISE CARDS STAGGER ANIMATION
// ====================================

const expertiseCards = document.querySelectorAll('.expertise-card');

expertiseCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// ====================================
// BENEFITS COUNTER ANIMATION
// ====================================

const benefitNumbers = document.querySelectorAll('.benefit-number');

const animateNumbers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.5 });

benefitNumbers.forEach(num => {
    num.style.opacity = '0';
    num.style.transform = 'scale(0.5)';
    num.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    animateNumbers.observe(num);
});

// ====================================
// PROCESS STEPS HOVER EFFECT
// ====================================

const processSteps = document.querySelectorAll('.process-step');

processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        const icon = step.querySelector('.step-icon');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    step.addEventListener('mouseleave', () => {
        const icon = step.querySelector('.step-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// ====================================
// TERRITORY CARDS PARALLAX HOVER
// ====================================

const territoryCards = document.querySelectorAll('.territory-card');

territoryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const img = card.querySelector('.territory-img');
        if (img) {
            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            img.style.transition = 'transform 0.1s ease-out';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.territory-img');
        if (img) {
            img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            img.style.transition = 'transform 0.5s ease-out';
        }
    });
});

// ====================================
// FOOTER SOCIAL ICONS ANIMATION
// ====================================

const socialIcons = document.querySelectorAll('.footer-social a');

socialIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
});

// ====================================
// CONSOLE MESSAGE
// ====================================

console.log('%c🏛️ Immobilier Neuf d\'Exception - Occitanie Premium', 'font-size: 16px; font-weight: bold; color: #D4AF37;');
console.log('%cDéveloppé pour FG STRATEGIES Montpellier', 'font-size: 12px; color: #9CAF88;');
console.log('%c💡 Pour configurer le lien de réservation, modifiez la variable BOOKING_URL dans js/main.js', 'font-size: 11px; color: #8B8680;');

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// RESPONSIVE UTILITIES
// ====================================

let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    
    // Only reload if crossing mobile/desktop threshold
    if ((windowWidth <= 968 && newWidth > 968) || (windowWidth > 968 && newWidth <= 968)) {
        windowWidth = newWidth;
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    windowWidth = newWidth;
});