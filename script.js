/* =============================================
   PORTFOLIO IT SUPPORT — script.js
   Marco Bianchi
============================================= */

(function () {
  'use strict';

  /* -----------------------------------------
     1. NAVBAR — scroll & active link
  ----------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled state
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  /* -----------------------------------------
     2. BURGER MENU (mobile)
  ----------------------------------------- */
  const burger = document.getElementById('burger');
  const navLinksEl = document.getElementById('nav-links');

  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
    document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* -----------------------------------------
     3. SMOOTH SCROLL (pour anciens navigateurs)
  ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* -----------------------------------------
     4. INTERSECTION OBSERVER — Animations
  ----------------------------------------- */
  // Skill cards (staggered)
  const skillCards = document.querySelectorAll('.skill-card');
  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || 0) * 100;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  skillCards.forEach(function (card) { cardObserver.observe(card); });

  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 120);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(function (item) { timelineObserver.observe(item); });

  // Skill bars
  const barFills = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(function (bar) { barObserver.observe(bar); });

  // Generic fade-up for other elements
  const fadeEls = document.querySelectorAll('.apropos-grid, .formation-item, .contact-grid, .skill-bars');
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });

  /* -----------------------------------------
     5. CONTACT FORM — validation & feedback
  ----------------------------------------- */
  const form = document.getElementById('contact-form');
  const notice = document.getElementById('form-notice');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      notice.className = 'form-notice';
      notice.textContent = '';

      const nom     = form.nom.value.trim();
      const email   = form.email.value.trim();
      const sujet   = form.sujet.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      if (!nom || !email || !sujet || !message) {
        notice.textContent = 'Veuillez remplir tous les champs.';
        notice.className = 'form-notice error';
        return;
      }

      if (!isValidEmail(email)) {
        notice.textContent = 'Veuillez saisir une adresse email valide.';
        notice.className = 'form-notice error';
        return;
      }

      // Simulate sending (replace with real endpoint / EmailJS / etc.)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

      setTimeout(function () {
        notice.textContent = '✓ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
        notice.className = 'form-notice success';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* -----------------------------------------
     6. INPUT FOCUS EFFECT
  ----------------------------------------- */
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(function (el) {
    el.addEventListener('focus', function () {
      this.parentElement.querySelector('label').style.color = 'rgba(192,57,43,0.9)';
    });
    el.addEventListener('blur', function () {
      this.parentElement.querySelector('label').style.color = '';
    });
  });

  /* -----------------------------------------
     7. TYPED EFFECT (héro subtitle)
  ----------------------------------------- */
  const roles = [
    'IT Support Specialist',
    'Helpdesk N1 & N2',
    'Technicien Réseaux',
    'Administrateur Windows',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const labelEl = document.querySelector('.hero-label');

  if (labelEl) {
    function type() {
      const current = roles[roleIndex];
      if (isDeleting) {
        labelEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        labelEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    // Start after hero animation
    setTimeout(type, 1800);
  }

  /* -----------------------------------------
     8. CURSOR GLOW (desktop uniquement)
  ----------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'width:400px',
      'height:400px',
      'border-radius:50%',
      'background:radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%)',
      'transform:translate(-50%,-50%)',
      'transition:left 0.15s ease,top 0.15s ease',
      'z-index:0',
      'will-change:transform',
    ].join(';');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

})();
