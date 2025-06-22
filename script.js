document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION (MOBILE MENU) ---
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('open');
    });
  }
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  }
  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  // --- THEME TOGGLE ---
  const themeToggleButton = document.getElementById('theme-toggle');
  const sunIcon = '<i class="fas fa-sun"></i>';
  const moonIcon = '<i class="fas fa-moon"></i>';

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    themeToggleButton.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Prioritize saved theme over system preference
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // --- DYNAMIC TYPING ANIMATION ---
  const typingElement = document.getElementById('typing-text');
  const phrases = [
    "Hello, I'm Shubham Kumar.",
    "A Web Developer.",
    "A Lifelong Learner."
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typeSpeed = isDeleting ? 75 : 150;
    setTimeout(type, typeSpeed);
  }
  if (typingElement) type();

  // --- SCROLL-IN ANIMATIONS (USING INTERSECTION OBSERVER) ---
  const observerOptions = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger animations for child items in skills and project cards (if any)
        const children = entry.target.querySelectorAll('.skills__grid > *, .card__grid > *');
        children.forEach((child, index) => {
          child.style.setProperty('--stagger-index', index);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animated').forEach(el => observer.observe(el));

  // --- CONTACT FORM SUBMISSION (SIMULATION) ---
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = "Thank you for your message!";
    setTimeout(() => {
      formMessage.textContent = "";
      contactForm.reset();
    }, 4000);
  });

  // --- FOOTER YEAR UPDATE ---
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
