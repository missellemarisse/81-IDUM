const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const onScroll = () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name')?.value.trim();
    const email = document.getElementById('reg-email')?.value.trim();
    const phone = document.getElementById('reg-phone')?.value.trim();
    const password = document.getElementById('reg-password')?.value;
    const passwordConfirm = document.getElementById('reg-password-confirm')?.value;

    if (!name || !email || !phone || !password || !passwordConfirm) {
      registerMessage.textContent = "Iltimos, barcha maydonlarni to'ldiring.";
      registerMessage.style.color = '#b91c1c';
      return;
    }

    if (password.length < 6) {
      registerMessage.textContent = "Parol kamida 6 ta belgidan iborat bo'lishi kerak.";
      registerMessage.style.color = '#b91c1c';
      return;
    }

    if (password !== passwordConfirm) {
      registerMessage.textContent = "Parollar mos kelmadi.";
      registerMessage.style.color = '#b91c1c';
      return;
    }

    registerMessage.textContent = "Ro'yxatdan o'tdingiz! (Demo rejim)";
    registerMessage.style.color = '#0f766e';
    registerForm.reset();
  });
}
