document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initEmailForms();
  initSmoothScroll();
});

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (!mobileMenuBtn || !mobileMenu || !menuIcon) return;
  
  let isMenuOpen = false;
  
  mobileMenuBtn.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden', !isMenuOpen);
    
    if (isMenuOpen) {
      menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    } else {
      menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }
  });
}

function initEmailForms() {
  const heroForm = document.getElementById('hero-form');
  const signupForm = document.getElementById('signup-form');
  
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('hero-email');
      const messageEl = document.getElementById('hero-message');
      handleFormSubmit(emailInput, messageEl);
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('signup-email');
      const messageEl = document.getElementById('signup-message');
      handleFormSubmit(emailInput, messageEl);
    });
  }
}

function handleFormSubmit(emailInput, messageEl) {
  if (!emailInput || !messageEl) return;
  
  const email = emailInput.value.trim();
  
  if (!email || !validateEmail(email)) {
    showMessage(messageEl, 'Please enter a valid email address.', false);
    return;
  }
  
  showMessage(messageEl, 'Thanks! You\'re on the list. We\'ll be in touch soon.', true);
  emailInput.value = '';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(element, message, isSuccess) {
  element.textContent = message;
  element.classList.remove('hidden', 'message-success', 'message-error');
  element.classList.add(isSuccess ? 'message-success' : 'message-error', 'fade-in');
  
  setTimeout(function() {
    element.classList.add('hidden');
  }, 5000);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (!href || href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const menuIcon = document.getElementById('menu-icon');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          if (menuIcon) {
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
          }
        }
      }
    });
  });
}
