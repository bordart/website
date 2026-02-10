// BordArt - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('mainNav');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ===== Smooth Scroll for Navigation Links =====
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();

                const target = document.querySelector(href);

                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            const whatsappMessage = `Ola! Meu nome e ${name}.%0A%0A${message}%0A%0AE-mail: ${email}${phone ? '%0ATelefone: ' + phone : ''}`;
            const whatsappUrl = `https://wa.me/5579988196571?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');

            showFormFeedback('Redirecionando para o WhatsApp...', 'success');
            contactForm.reset();
        });
    }

    function showFormFeedback(message, type) {
        const existingFeedback = document.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = `form-feedback alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        feedback.textContent = message;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.parentNode.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 5000);
    }

    // ===== Intersection Observer for Scroll Animations =====
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animObserver.observe(el);
    });

    // ===== Stats Counter Animation =====
    const stats = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasK = text.includes('k');

        let target = parseInt(text.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current);
            if (hasK) displayValue = displayValue + 'k';
            if (hasPlus) displayValue = displayValue + '+';

            element.textContent = displayValue;
        }, stepTime);
    }

    // ===== Initialize Bootstrap Carousel =====
    const portfolioCarousel = document.getElementById('portfolioCarousel');
    if (portfolioCarousel) {
        new bootstrap.Carousel(portfolioCarousel, {
            interval: 5000,
            wrap: true,
            touch: true
        });
    }
});
