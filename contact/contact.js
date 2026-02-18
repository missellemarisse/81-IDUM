const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
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

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Iltimos, barcha maydonlarni to'ldiring.";
      formMessage.style.color = '#b91c1c';
      return;
    }

    formMessage.textContent = "Xabaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz.";
    formMessage.style.color = '#0f766e';
    contactForm.reset();
  });
}
