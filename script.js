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
// THEME TOGGLE
// ========================================
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeIcon.className = document.body.classList.contains('dark-theme') 
        ? 'fas fa-sun' 
        : 'fas fa-moon';
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.className = 'fas fa-sun';
}

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
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
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
if (counters.length > 0) {
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
}

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
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress-width', progress + '%');
            });
        }
    }
});

// ========================================
// FORM SUBMISSION - open user's email client via mailto:
// ========================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const subject = contactForm.querySelector('input[name="subject"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before sending.');
        return;
    }

    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;

    // Build mailto link
    const to = 'harshalbarhate2028@gmail.com';
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Provide immediate feedback then open mail client
    submitBtn.innerHTML = '<span>Opening mail client...</span> <i class="fas fa-paper-plane"></i>';
    submitBtn.disabled = true;

    // Open mail client (will open default email app)
    window.location.href = mailto;

    // Restore button after short delay (user can close or cancel their mail client)
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        // Optionally clear form
        contactForm.reset();
    }, 1500);
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
// Disable tilt on touch devices to prevent awkward interactions
if (!('ontouchstart' in window)) {
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
} else {
    // For touch devices keep a small elevation on tap for affordance
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('touchstart', () => card.style.transform = 'translateY(-6px)');
        card.addEventListener('touchend', () => card.style.transform = 'translateY(0)');
    });
}

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

    // Show either a case-study (Problem / Approach / Impact) or a simple highlights list.
    const caseBlock = projectModal.querySelector('.modal-case');
    const outcomesBlock = projectModal.querySelector('.modal-outcomes-block');
    const problemEl = projectModal.querySelector('.modal-problem');
    const approachEl = projectModal.querySelector('.modal-approach');
    const impactEl = projectModal.querySelector('.modal-impact');
    const outcomesEl = projectModal.querySelector('.modal-outcomes');

    // Reset blocks
    caseBlock.style.display = 'none';
    outcomesBlock.style.display = 'none';
    problemEl.textContent = '';
    approachEl.innerHTML = '';
    impactEl.innerHTML = '';
    outcomesEl.innerHTML = '';

    if (data.problem && data.approach && data.impact) {
        caseBlock.style.display = '';
        problemEl.textContent = data.problem || '';
        (data.approach || []).forEach(item => { const li = document.createElement('li'); li.textContent = item; approachEl.appendChild(li); });
        (data.impact || []).forEach(item => { const li = document.createElement('li'); li.textContent = item; impactEl.appendChild(li); });
    } else {
        outcomesBlock.style.display = '';
        // Prefer exact HTML pasted on the card
        if (data.outcomesHTML && data.outcomesHTML.trim().length) {
            outcomesEl.innerHTML = data.outcomesHTML;
        } else if (Array.isArray(data.outcomes) && data.outcomes.length) {
            data.outcomes.forEach(item => { const li = document.createElement('li'); li.textContent = item; outcomesEl.appendChild(li); });
        }
    }

    // Tech tags
    const techList = projectModal.querySelector('.modal-tech');
    techList.innerHTML = '';
    (data.tech || []).forEach(t => { const el = document.createElement('span'); el.className = 'tech-tag'; el.textContent = t; techList.appendChild(el); });

    // Screenshots - Create carousel
    const shots = projectModal.querySelector('.modal-screenshots');
    shots.innerHTML = '';
    
    if (data.screenshots && data.screenshots.length > 0) {
        const carousel = document.createElement('div');
        carousel.className = 'screenshot-carousel';
        
        const container = document.createElement('div');
        container.className = 'carousel-container';
        
        const slides = document.createElement('div');
        slides.className = 'carousel-slides';
        
        data.screenshots.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide' + (index === 0 ? ' active' : '');
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${data.title} screenshot ${index + 1}`;
            slide.appendChild(img);
            slides.appendChild(slide);
        });
        
        container.appendChild(slides);
        
        // Navigation buttons
        if (data.screenshots.length > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-prev';
            prevBtn.innerHTML = '&#10094;';
            prevBtn.setAttribute('aria-label', 'Previous screenshot');
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-next';
            nextBtn.innerHTML = '&#10095;';
            nextBtn.setAttribute('aria-label', 'Next screenshot');
            
            container.appendChild(prevBtn);
            container.appendChild(nextBtn);
            
            // Indicators
            const indicators = document.createElement('div');
            indicators.className = 'carousel-indicators';
            
            data.screenshots.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
                indicator.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
                indicators.appendChild(indicator);
            });
            
            carousel.appendChild(container);
            carousel.appendChild(indicators);
            
            // Initialize carousel functionality
            initializeCarousel(carousel, data.screenshots.length);
        } else {
            carousel.appendChild(container);
        }
        
        shots.appendChild(carousel);
    }

    // Links
    const links = projectModal.querySelector('.modal-links');
    links.innerHTML = '';
    if (data.repo) { const a = document.createElement('a'); a.href = data.repo; a.target = '_blank'; a.className = 'btn-outline'; a.textContent = 'Repository'; links.appendChild(a); }
    if (data.live) { const a = document.createElement('a'); a.href = data.live; a.target = '_blank'; a.className = 'demo-btn'; a.textContent = 'Live Demo'; links.appendChild(a); }

    projectModal.classList.add('open'); 
    projectModal.setAttribute('aria-hidden', 'false');
    
    // Initialize tab functionality
    initializeModalTabs();
}

function initializeModalTabs() {
    const tabs = projectModal.querySelectorAll('.modal-tab');
    const tabPanes = projectModal.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show the corresponding tab pane
            const targetTab = tab.getAttribute('data-tab');
            const targetPane = projectModal.querySelector(`#${targetTab}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

function closeProjectModal() {
    projectModal.classList.remove('open'); projectModal.setAttribute('aria-hidden', 'true');
}

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

// ========================================
// CAROUSEL FUNCTIONALITY
// ========================================
function initializeCarousel(carousel, totalSlides) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const container = carousel.querySelector('.carousel-container');
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Start autoplay
    startAutoPlay();
}

// Wire details buttons to open with simple data map
const projectData = {
    'CoastVision': {
        title: 'CoastVision',
        desc: 'AI-based beach surveillance system for real-time swimmer and drowning detection with alerts for lifeguards.',
        tech: ['YOLO','OpenCV','Python'],
        problem: 'Preventing drownings at crowded beaches is hard due to limited lifeguard visibility and delayed alerts.',
        approach: [
            'Built a real-time detection pipeline using YOLO for swimmer and hazardous-object detection.',
            'Implemented zone-based monitoring to focus alerts on high-risk areas and reduce false positives.',
            'Integrated an edge-optimized model variant and a lightweight Flask dashboard for alerts.'
        ],
        impact: [
            'Reduced manual monitoring overhead by enabling automated alerts to lifeguards.',
            'Model optimized to run on Raspberry Pi-class devices for on-premise deployment.'
        ],
        screenshots: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop&q=80'],
        repo: 'https://github.com/Harshal-Bsys27/CoastVision',
        live: '#'
    },
    'LetsTravel': {
        title: 'LetsTravel',
        desc: 'Full-stack travel booking platform with personalized itinerary generation and PDF ticketing.',
        outcomes: [
            'End-to-end booking flow with secure checkout and PDF ticketing.',
            'Itinerary generation using user preferences and basic recommendation rules.',
            'Admin dashboard for bookings and property management.'
        ],
        tech: ['Flask','MongoDB','ReportLab'],
        screenshots: [
            'screenshots/letstravel_packages.png',
            'screenshots/letstravel_tourpkg.png',
            'screenshots/letstravel_personalizeditinerary.png',
            'screenshots/letstravel_checkout.png',
            'screenshots/letstravel_ticket.png',
            'screenshots/letstravel_dashboard.png'
        ],
        repo:'https://github.com/Harshal-Bsys27/LetsTravel',
        live:'https://letstravel-w00j.onrender.com'
    },
    'HireLens': {
        title:'HireLens',
        desc:'Resume analyzer with NLP-based skill extraction and PDF recommendations.',
        outcomes: [
            'Automated skill extraction and candidate scoring for quick shortlisting.',
            'Transforms resumes to ATS-friendly layouts.',
            'Generates actionable PDF reports with improvement suggestions.'
        ],
        tech:['React','Flask','NLP','Tailwind'],
        screenshots:[
            'screenshots/hirelens-home.png',
            'screenshots/hirelens-upload.png',
            'screenshots/hirelens-role.png',
            'screenshots/hirelens-result.png',
            'screenshots/hirelens-chart.png'
        ],
        repo:'https://github.com/Harshal-Bsys27/AI-Resume-Analyzer-Hirelens',
        live:'#'
    },
    'AI Study Planner': {
        title:'AI Study Planner',
        desc:'Personalized study scheduler with progress tracking and calendar integration.',
        outcomes: [
            'Generates tailored study plans based on user goals and time availability.',
            'Visual progress tracking and interactive charts to measure completion.',
            'Calendar integration for reminders and study sessions.'
        ],
        tech:['React','Flask','MUI'],
        screenshots:[
            'screenshots/studyplanner-loginpage.png',
            'screenshots/studyplanner-cutomized_plan.png',
            'screenshots/studyplanner-subjectdashboard_gen.png',
            'screenshots/studyplan_chart.png',
            'screenshots/studyplanner-history.png'
        ],
        repo:'https://github.com/Harshal-Bsys27/ai-study-planner',
        live:'https://ai-study-planner-frontend.onrender.com'
    },
    'Student Management System': {
        title:'Student Management',
        desc:'Full-stack student records app with role-based access and CSV import/export.',
        outcomes: [
            'CRUD operations for student records with role-based permissions.',
            'CSV import/export for bulk data management.',
            'Clean dashboard UI for admins and teachers.'
        ],
        tech:['Flask','SQLite','Bootstrap'],
        screenshots:[
            'screenshots/student_login.png',
            'screenshots/Studentlist.png',
            'screenshots/Studentprofile.png',
            'screenshots/student_Userdashboard.png',
            'screenshots/student_admindashboard.png'
        ],
        repo:'https://github.com/Harshal-Bsys27/student-management-system',
        live:'https://student-management-system-4ptl.onrender.com/'
    }
}

document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.project-card');
        const title = (card.querySelector('.project-title')||{}).innerText || '';
        const name = title.trim();
        const data = projectData[name] || { title: name, desc: '', tech: [], screenshots: [], repo: '#', live: '#' };
        // If the card contains a hidden outcomes list (user-pasted points), capture its HTML and pass to modal so exact points appear.
        const cardOutcomes = card.querySelector('.project-outcomes');
        if (cardOutcomes) data.outcomesHTML = cardOutcomes.innerHTML;
        openProjectModal(data);
    });
});

// ========================================
// HERO INTERACTIVE EFFECTS
// ========================================

// Magnetic cursor effect for buttons and interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const magneticElements = document.querySelectorAll('.btn, .icon-btn, .highlight-inline, .hero-hb');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / 8;
            const deltaY = (e.clientY - centerY) / 8;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
});

// Enhanced particle interaction
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (e.clientX * speed) / 100;
        const y = (e.clientY * speed) / 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Name animation enhancement - removed for cleaner look

// Hero showcase interaction
const heroShowcase = document.querySelector('.hero-showcase');
if (heroShowcase) {
    heroShowcase.addEventListener('mouseenter', () => {
        heroShowcase.style.transform = 'scale(1.02) rotate(1deg)';
    });
    
    heroShowcase.addEventListener('mouseleave', () => {
        heroShowcase.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Typing effect enhancement with sound-like visual feedback
const originalType = window.type;
window.type = function() {
    originalType();
    
    // Add subtle visual feedback during typing
    const cursor = document.querySelector('.cursor-blink');
    if (cursor) {
        cursor.style.opacity = Math.random() > 0.5 ? '1' : '0.7';
    }
};

// Scroll-triggered particle acceleration
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${rate * speed}px)`;
    });
});

// ========================================
// ENHANCED BACKGROUND ANIMATIONS
// ========================================

// Mouse follower effect
document.addEventListener('DOMContentLoaded', () => {
    const mouseFollower = document.querySelector('.mouse-follower');
    const hero = document.querySelector('.hero');
    
    if (mouseFollower && hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            mouseFollower.style.left = `${x - 50}px`;
            mouseFollower.style.top = `${y - 50}px`;
            mouseFollower.style.opacity = '0.3';
        });
        
        hero.addEventListener('mouseleave', () => {
            mouseFollower.style.opacity = '0';
        });
    }
});

// Dynamic particle interaction with mouse
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Neural network pulse effect
function createNeuralPulse() {
    const connections = document.querySelectorAll('.connection');
    connections.forEach((connection, index) => {
        setTimeout(() => {
            connection.style.animation = 'none';
            setTimeout(() => {
                connection.style.animation = 'connectionFlow 4s ease-in-out infinite';
            }, 10);
        }, index * 500);
    });
}

// Trigger neural pulse every 10 seconds
setInterval(createNeuralPulse, 10000);

// Enhanced particle interactions
function enhanceParticles() {
    const particles = document.querySelectorAll('.particle-dot');
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.animationDuration = `${12 + Math.random() * 8}s`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
        }, index * 200);
    });
}

// Initialize enhanced particles
setTimeout(enhanceParticles, 2000);

// Data point animations
function animateDataPoints() {
    const points = document.querySelectorAll('.data-point');
    points.forEach((point, index) => {
        setTimeout(() => {
            point.style.animation = 'none';
            setTimeout(() => {
                point.style.animation = 'dataFloat 12s ease-in-out infinite';
                point.style.animationDelay = `${index * 2.4}s`;
            }, 10);
        }, index * 500);
    });
}

// Trigger data point animations
setTimeout(animateDataPoints, 3000);

// Circuit pattern animation
function animateCircuit() {
    const circuit = document.querySelector('.circuit-svg rect');
    if (circuit) {
        setInterval(() => {
            circuit.style.animation = 'none';
            setTimeout(() => {
                circuit.style.animation = 'circuitFade 10s ease-in-out infinite';
            }, 10);
        }, 10000);
    }
}

// Start circuit animation
setTimeout(animateCircuit, 1000);

// Blob morphing enhancement
function enhanceBlobs() {
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        setTimeout(() => {
            blob.style.animationDuration = `${15 + Math.random() * 10}s`;
            blob.style.animationDelay = `${Math.random() * 20}s`;
        }, index * 1000);
    });
}

// Initialize enhanced blobs
setTimeout(enhanceBlobs, 1500);

// Energy wave burst effect
function triggerWaveBurst() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        setTimeout(() => {
            wave.style.animation = 'none';
            setTimeout(() => {
                wave.style.animation = 'waveExpand 6s ease-out infinite';
            }, 10);
        }, index * 200);
    });
}

// Trigger wave burst every 15 seconds
setInterval(triggerWaveBurst, 15000);

// Dynamic shape morphing
function morphShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        setTimeout(() => {
            const shapes = [
                'polygon(50% 0%, 0% 100%, 100% 100%)',
                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                'circle(50% at 50% 50%)',
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)'
            ];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            shape.style.clipPath = randomShape;
        }, index * 300);
    });
}

// Morph shapes every 8 seconds
setInterval(morphShapes, 8000);
