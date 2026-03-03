/* ═══════════════════════════════════════════════
   BOOSTIFY CORP — MAIN.JS v2.1
   Performance optimized + floating shapes fixed
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ──────────────────────────────────────────
       1. NAVBAR — Scroll state + mobile menu
       ────────────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    function updateOnScroll() {
        navbar.classList.toggle('scrolled', lastScrollY > 60);

        // Scroll progress bar
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const width = (lastScrollY / maxScroll) * 100;
        progressBar.style.width = `${width}%`;

        // Scrollbar glow position
        const scrollPercent = lastScrollY / maxScroll;
        const glowY = scrollPercent * (window.innerHeight - 60);
        scrollTrackGlow.style.top = `${glowY}px`;
        const hue = 220 + scrollPercent * 40;
        scrollTrackGlow.style.background = `radial-gradient(circle, hsla(${hue}, 80%, 60%, 0.6) 0%, transparent 70%)`;

        if (!isScrolling) {
            scrollTrackGlow.classList.add('active');
            isScrolling = true;
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollTrackGlow.classList.remove('active');
            isScrolling = false;
        }, 800);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    mobileMenuBtn?.addEventListener('click', () => mobileMenu.classList.add('active'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ──────────────────────────────────────────
       2. SCROLL REVEAL — IntersectionObserver
       ────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ──────────────────────────────────────────
       3. 3D TILT EFFECT — on cards
       ────────────────────────────────────────── */
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.transition = 'transform 0.1s ease';

            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.left = `${(x / rect.width) * 100 - 30}%`;
                shine.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

            const shine = card.querySelector('.card-shine');
            if (shine) { shine.style.opacity = '0'; shine.style.left = '-100%'; }
        });
    });

    /* ──────────────────────────────────────────
       4. ANIMATED COUNTERS
       ────────────────────────────────────────── */
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const start = performance.now();

                function tick(now) {
                    const p = Math.min((now - start) / 2000, 1);
                    const eased = 1 - Math.pow(1 - p, 4);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                }

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

    /* ──────────────────────────────────────────
       5. HERO PARALLAX — Orbs + rings follow mouse
       ────────────────────────────────────────── */
    const heroSection = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.floating-orb');
    const heroRings = document.querySelectorAll('.hero-ring');

    heroSection?.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = (e.clientX - centerX) / centerX;
        const dy = (e.clientY - centerY) / centerY;

        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 15;
            orb.style.transform = `translate(${dx * speed}px, ${dy * speed}px)`;
        });

        heroRings.forEach((ring, i) => {
            const speed = (i + 1) * 5;
            ring.style.transform = `translate(calc(-50% + ${dx * speed}px), calc(-50% + ${dy * speed}px))`;
        });
    });

    /* ──────────────────────────────────────────
       6. PARTICLE CANVAS — Lightweight version
       ────────────────────────────────────────── */
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.3';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Only 25 particles (was 50) — big perf gain
    for (let i = 0; i < 25; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
            ctx.fill();

            // Only connect to next 3 particles (not all N)
            for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = dx * dx + dy * dy; // skip sqrt for speed
                if (dist < 14400) { // 120^2
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 14400)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    /* ──────────────────────────────────────────
       7. FLOATING SHAPES — Random alive elements
       ────────────────────────────────────────── */
    const shapesContainer = document.getElementById('floatingShapes');
    const shapeTypes = ['circle', 'ring', 'diamond', 'cross', 'dot'];

    function spawnShape() {
        if (!shapesContainer || shapesContainer.children.length >= 12) return;

        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const size = Math.random() * 18 + 10; // 10-28px
        const leftPos = Math.random() * 90 + 5; // 5%-95%
        const duration = Math.random() * 12 + 12; // 12-24s

        const el = document.createElement('div');
        el.className = `floating-shape ${type}`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${leftPos}%`;
        el.style.bottom = `-${size + 10}px`; // start just below viewport
        el.style.animation = `floatShapeUp ${duration}s linear forwards`;

        if (type === 'diamond') {
            el.style.transform = 'rotate(45deg)';
        }

        shapesContainer.appendChild(el);

        // Remove after animation ends
        el.addEventListener('animationend', () => el.remove());

        // Safety fallback
        setTimeout(() => {
            if (el.parentNode) el.remove();
        }, (duration + 1) * 1000);
    }

    // Initial burst
    for (let i = 0; i < 6; i++) {
        setTimeout(spawnShape, i * 400);
    }

    // Keep spawning
    setInterval(spawnShape, 2500);

    /* ──────────────────────────────────────────
       8. DYNAMIC SCROLLBAR GLOW
       ────────────────────────────────────────── */
    const scrollTrackGlow = document.getElementById('scrollTrackGlow');
    let scrollTimeout;
    let isScrolling = false;

    /* ──────────────────────────────────────────
       9. SCROLL PROGRESS BAR
       ────────────────────────────────────────── */
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    document.body.appendChild(progressBar);

    /* ──────────────────────────────────────────
       10. MAGNETIC BUTTONS
       ────────────────────────────────────────── */
    document.querySelectorAll('.btn-primary, .btn-secondary, .form-submit, .btn-outline, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    /* ──────────────────────────────────────────
       11. CONTACT FORM
       ────────────────────────────────────────── */
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.form-submit');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.classList.add('success');
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = 'Send Message';
                btn.classList.remove('success');
                btn.disabled = false;
            }, 3000);
        }, 1200);
    });

    /* ──────────────────────────────────────────
       12. ACTIVE NAV LINK HIGHLIGHTING
       ────────────────────────────────────────── */
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--navy-900)' : '';
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-72px 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

    /* ──────────────────────────────────────────
       13. RANDOM MICRO-PULSE on stat items
       ────────────────────────────────────────── */
    const statItems = document.querySelectorAll('.stat-item, .about-stat');
    setInterval(() => {
        if (statItems.length === 0) return;
        const item = statItems[Math.floor(Math.random() * statItems.length)];
        item.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.15)';
        item.style.borderColor = 'var(--navy-200)';
        setTimeout(() => { item.style.boxShadow = ''; item.style.borderColor = ''; }, 1500);
    }, 4000);

    /* ──────────────────────────────────────────
       14. TYPING EFFECT on hero badge
       ────────────────────────────────────────── */
    const badgeText = document.querySelector('.badge-text');
    if (badgeText) {
        const phrases = ['n8n Automation Experts', 'AI-Powered Solutions', 'Business Automation', 'Custom AI Agents'];
        let phraseIdx = 0, charIdx = phrases[0].length;
        let deleting = true;

        function typeLoop() {
            const phrase = phrases[phraseIdx];
            if (deleting) {
                charIdx--;
                badgeText.textContent = phrase.substring(0, charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(typeLoop, 300);
                    return;
                }
                setTimeout(typeLoop, 30);
            } else {
                charIdx++;
                badgeText.textContent = phrases[phraseIdx].substring(0, charIdx);
                if (charIdx === phrases[phraseIdx].length) {
                    deleting = true;
                    setTimeout(typeLoop, 3000);
                    return;
                }
                setTimeout(typeLoop, 60);
            }
        }

        setTimeout(typeLoop, 4000);
    }

});
