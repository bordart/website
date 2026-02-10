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

            const whatsappMessage = `Olá! Meu nome é ${name}.%0A%0A${message}%0A%0AE-mail: ${email}${phone ? '%0ATelefone: ' + phone : ''}`;
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

    // ===== Initialize Bootstrap Carousels =====
    const portfolioCarousel = document.getElementById('portfolioCarousel');
    if (portfolioCarousel) {
        new bootstrap.Carousel(portfolioCarousel, {
            interval: 5000,
            wrap: true,
            touch: true
        });
    }

    const portfolioCarouselMobile = document.getElementById('portfolioCarouselMobile');
    if (portfolioCarouselMobile) {
        new bootstrap.Carousel(portfolioCarouselMobile, {
            interval: 4000,
            wrap: true,
            touch: true
        });
    }

    // ===== Lazy-load Instagram Embeds =====
    function loadInstagramEmbeds(slide) {
        const lazyEmbeds = slide.querySelectorAll('.instagram-lazy');
        lazyEmbeds.forEach(placeholder => {
            const permalink = placeholder.dataset.permalink;
            const blockquote = document.createElement('blockquote');
            blockquote.className = 'instagram-media';
            blockquote.dataset.instgrmPermalink = permalink;
            blockquote.dataset.instgrmVersion = '14';
            blockquote.setAttribute('style', 'background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:calc(100% - 2px);');
            blockquote.innerHTML = '<div style="padding:16px;"><a href="' + permalink + '" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"><div style="display:flex; flex-direction:row; align-items:center;"><div style="background-color:#F4F4F4; border-radius:50%; flex-grow:0; height:40px; margin-right:14px; width:40px;"></div><div style="display:flex; flex-direction:column; flex-grow:1; justify-content:center;"><div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; margin-bottom:6px; width:100px;"></div><div style="background-color:#F4F4F4; border-radius:4px; flex-grow:0; height:14px; width:60px;"></div></div></div><div style="padding:19% 0;"></div><div style="display:block; height:50px; margin:0 auto 12px; width:50px;"></div><div style="padding-top:8px;"><div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver no Instagram</div></div></a></div>';
            placeholder.replaceWith(blockquote);
        });
        if (lazyEmbeds.length > 0 && window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }

    // Load embeds when carousel slides change
    [portfolioCarousel, portfolioCarouselMobile].forEach(carousel => {
        if (carousel) {
            carousel.addEventListener('slid.bs.carousel', function(e) {
                loadInstagramEmbeds(e.relatedTarget);
            });
        }
    });
});
