// Add smooth scrolling for navigation links
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

// Add navbar background color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.06)';
    }
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add animation for elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Add a CSS class to elements we want to animate
    const animateElements = document.querySelectorAll('.publication-item, .experience-item, .award-item, .service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        // Add initial hidden state class
        element.classList.add('pre-animation');
        observer.observe(element);
    });
});

// Add year to footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${currentYear} Zixin Wang. All rights reserved.`;
    }
});

// Add mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navContent = document.querySelector('.nav-content');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Insert before the nav links
    navContent.insertBefore(mobileMenuBtn, navContent.firstChild);
    
    // Add click event
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            navLinks.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        });
    });
});
