const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const signinForm = document.getElementById('signin-form');
const signinMessage = document.getElementById('signin-message');
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

if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email')?.value.trim();
    const password = document.getElementById('signin-password')?.value;

    if (!email || !password) {
      signinMessage.textContent = "Iltimos, email va parolni kiriting.";
      signinMessage.style.color = '#b91c1c';
      return;
    }

    signinMessage.textContent = "Kirish so'rovi qabul qilindi. (Demo rejim)";
    signinMessage.style.color = '#0f766e';
    signinForm.reset();
  });
}

// Password show/hide toggle
document.querySelectorAll('.pw-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const icon = btn.querySelector('i');
    if (!input) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.classList.toggle('fa-eye', !isHidden);
    icon.classList.toggle('fa-eye-slash', isHidden);
    btn.setAttribute('aria-label', isHidden ? "Parolni yashirish" : "Parolni ko'rsatish");
  });
});
