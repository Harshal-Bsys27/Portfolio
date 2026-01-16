// ========================================
//  CREATIVE PORTFOLIO - JAVASCRIPT
// ========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    }, 1500);
});

// ========================================
// NAVIGATION
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling
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

// Active nav on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// TYPING EFFECT
// ========================================
const typingText = document.querySelector('.typing-text');
const texts = [
    'CSE AIML Student',
    'AI/ML Enthusiast',
    'Full Stack Developer',
    'Problem Solver',
    'Python Developer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
}

// Start typing effect after page load
setTimeout(type, 2000);

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 100 ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation on scroll
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection && !counterStarted) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counterStarted = true;
            animateCounters();
        }
    }
});

// ========================================
// SKILL PROGRESS ANIMATION
// ========================================
const skillSection = document.querySelector('#skills');
let skillsAnimated = false;

window.addEventListener('scroll', () => {
    if (skillSection && !skillsAnimated) {
        const rect = skillSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillsAnimated = true;
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    }
});

// ========================================
// FORM SUBMISSION
// ========================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success message (you can customize this)
        console.log('Form submitted:', data);
        alert('Thank you! Your message has been sent successfully. I will get back to you soon!');
    }, 2000);
});

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.1;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// PROJECT CARD TILT EFFECT
// ========================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// FLOATING TECH ICONS ANIMATION
// ========================================
document.querySelectorAll('.floating-tech').forEach((tech, index) => {
    setInterval(() => {
        tech.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px) rotate(${Math.sin(Date.now() / 2000) * 5}deg)`;
    }, 50);
});

// ========================================
// SCROLL TO TOP
// ========================================
const footerLink = document.querySelector('.footer-links a');
if (footerLink) {
    footerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey) {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'p' to go to projects
    if (e.key === 'p' && !e.ctrlKey) {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey) {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// RESPONSIVE IMAGE LOADING
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🚀 Harshal Barhate Portfolio', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #764ba2; font-size: 14px;');
console.log('%cLooking for opportunities? Let\'s connect!', 'color: #f093fb; font-size: 14px;');

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
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

// Add link for AOS CSS
if (!document.querySelector('link[href*="aos"]')) {
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosCSS);
}

// ========================================
// ABOUT: Read-more toggle and small animations
// ========================================
const readMoreBtn = document.querySelector('.about-readmore');
if (readMoreBtn) {
    const aboutExtra = document.querySelector('.about-extra');
    readMoreBtn.addEventListener('click', () => {
        const open = aboutExtra.classList.toggle('open');
        aboutExtra.setAttribute('aria-hidden', (!open).toString());
        readMoreBtn.textContent = open ? 'Show less' : 'Read more';
    });
}

// Skill chip hover subtle animation
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => chip.style.transform = 'translateY(-4px)');
    chip.addEventListener('mouseleave', () => chip.style.transform = 'translateY(0)');
});

// ========================================
// VIDEO MODAL FOR DEMO BUTTONS
// ========================================
const videoModal = document.getElementById('video-modal');
const videoWrapper = document.querySelector('.video-wrapper');
const modalCloseBtn = document.querySelector('.modal-close');

function openVideoModal(src) {
    videoWrapper.innerHTML = '';
    if (src && src !== '#') {
        const iframe = document.createElement('iframe');
        iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;
        videoWrapper.appendChild(iframe);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'demo-placeholder';
        placeholder.innerHTML = '<i class="fas fa-info-circle"></i><span>Demo not available yet.</span>';
        videoWrapper.appendChild(placeholder);
    }
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
}

function closeVideoModal() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoWrapper.innerHTML = '';
}

// Delegate clicks on demo buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.demo-btn');
    if (!btn) return;
    e.preventDefault();
    const live = btn.getAttribute('data-live');
    const video = btn.getAttribute('data-video') || btn.getAttribute('href');

    // If a live demo URL is provided, open it in a new tab.
    if (live && live !== '#') {
        window.open(live, '_blank');
        return;
    }

    // Otherwise, try to open a video in the modal (if provided), or show placeholder.
    openVideoModal(video);
});

// Close handlers
modalCloseBtn.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
});

// ========================================
// Project Details Modal
// ========================================
const projectModal = document.getElementById('project-modal');
const projectModalInner = document.querySelector('.project-modal-inner');
const projectModalClose = document.querySelector('.project-close');

function openProjectModal(data) {
    projectModal.querySelector('.modal-title').textContent = data.title || 'Project';
    projectModal.querySelector('.modal-desc').textContent = data.desc || '';

    const techList = projectModal.querySelector('.modal-tech');
    techList.innerHTML = '';
    (data.tech || []).forEach(t => {
        const el = document.createElement('span'); el.className = 'tech-tag'; el.textContent = t; techList.appendChild(el);
    });

    const shots = projectModal.querySelector('.modal-screenshots');
    shots.innerHTML = '';
    (data.screenshots || []).forEach(src => {
        const img = document.createElement('img'); img.src = src; shots.appendChild(img);
    });

    const links = projectModal.querySelector('.modal-links');
    links.innerHTML = '';
    if (data.repo) {
        const a = document.createElement('a'); a.href = data.repo; a.target = '_blank'; a.className = 'btn-outline'; a.textContent = 'Repository'; links.appendChild(a);
    }
    if (data.live) {
        const a = document.createElement('a'); a.href = data.live; a.target = '_blank'; a.className = 'demo-btn'; a.textContent = 'Live Demo'; links.appendChild(a);
    }

    projectModal.classList.add('open'); projectModal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
    projectModal.classList.remove('open'); projectModal.setAttribute('aria-hidden', 'true');
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

// Wire details buttons to open with simple data map
const projectData = {
    'CoastVision': {
        title: 'CoastVision',
        desc: 'AI-based beach surveillance system for real-time swimmer and drowning detection with alerts for lifeguards.',
        tech: ['YOLO','OpenCV','Python'],
        screenshots: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80'],
        repo: 'https://github.com/Harshal-Bsys27/CoastVision',
        live: '#'
    },
    'LetsTravel': {
        title: 'LetsTravel', desc: 'Full-stack travel booking platform with personalized itinerary generation and PDF ticketing.', tech: ['Flask','MongoDB'], screenshots:['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop&q=80'], repo:'https://github.com/Harshal-Bsys27/LetsTravel', live:'https://letstravel-w00j.onrender.com'
    },
    'HireLens': { title:'HireLens', desc:'Resume analyzer with NLP-based skill extraction and PDF reports.', tech:['React','Flask','NLP'], screenshots:['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop&q=80'], repo:'https://github.com/Harshal-Bsys27/AI-Resume-Analyzer-Hirelens', live:'#' },
    'AI Study Planner': { title:'AI Study Planner', desc:'Personalized study plans, progress tracking and calendar integration.', tech:['React','Flask','MUI'], screenshots:['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop&q=80'], repo:'https://github.com/Harshal-Bsys27/ai-study-planner', live:'https://ai-study-planner-frontend.onrender.com' },
    'Student Management System': { title:'Student Management', desc:'Manage student records with role-based access and CSV import/export.', tech:['Flask','SQLite'], screenshots:['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&q=80'], repo:'https://github.com/Harshal-Bsys27/student-management-system', live:'https://student-management-system-4ptl.onrender.com/' }
}

document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.project-card');
        const title = (card.querySelector('.project-title')||{}).innerText || '';
        const name = title.trim();
        const data = projectData[name] || { title: name, desc: '', tech: [], screenshots: [], repo: '#', live: '#' };
        openProjectModal(data);
    });
});
