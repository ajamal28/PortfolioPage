/* ======================================================
   PORTFOLIO — Abdullahi Jamal
   js/main.js
====================================================== */

(function () {
  'use strict';

  /* ==============================
     NAVIGATION
  ============================== */
  const header    = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll header style
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav();
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', function () {
    this.classList.toggle('open');
    navLinks.classList.toggle('open');
    this.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link based on scroll position
  function highlightActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = navLinks.querySelector('a[href="#' + id + '"]');

      if (link) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.querySelectorAll('a').forEach(function (l) {
            l.classList.remove('active');
          });
          link.classList.add('active');
        }
      }
    });
  }

  /* ==============================
     TYPING / ROLE ROTATOR
  ============================== */
  var roles = [
    'Software Developer',
    'PHP & Symfony Engineer',
    'Full-Stack Builder',
    'Technical Support Pro',
    'Automation Enthusiast'
  ];

  var roleIndex  = 0;
  var charIndex  = 0;
  var isDeleting = false;
  var roleEl     = document.getElementById('roleText');

  function typeRole() {
    if (!roleEl) return;

    var current = roles[roleIndex];

    if (!isDeleting) {
      roleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
    } else {
      roleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting   = false;
        roleIndex    = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeRole, isDeleting ? 55 : 100);
  }

  setTimeout(typeRole, 900);

  /* ==============================
     SCROLL REVEAL ANIMATIONS
  ============================== */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ==============================
     SMOOTH SCROLL
  ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href   = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==============================
     CONTACT FORM
  ============================== */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      var status = document.getElementById('formStatus');
      var btn = this.querySelector('button[type="submit"]');

      if (!this.checkValidity()) {
        e.preventDefault();
        this.reportValidity();
        status.textContent = 'Please complete all fields correctly.';
        status.className = 'form-status is-error';
        return;
      }

      status.textContent = 'Sending your message securely…';
      status.className = 'form-status is-sending';
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;
    });
  }

  /* ==============================
     SKILL PILLS — HOVER RIPPLE
     (lightweight micro-interaction)
  ============================== */
  document.querySelectorAll('.skill-pill').forEach(function (pill) {
    pill.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });
    pill.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  /* ==============================
     RUN INITIAL CHECKS
  ============================== */
  handleHeaderScroll();

})();
