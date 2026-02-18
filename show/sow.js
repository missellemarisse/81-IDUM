const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');

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

// Fikr-mulohazalar: izoh formasi va yoqtirish tugmalari
const commentForm = document.getElementById('comment-form');
const commentLikes = document.querySelectorAll('.comment-like');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const prev = commentForm.querySelector('.form-message');
    if (prev) prev.remove();
    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.style.color = 'var(--primary)';
    msg.textContent = "Izohingiz qabul qilindi. Moderator ko'rib chiqgach chop etiladi.";
    commentForm.appendChild(msg);
    commentForm.reset();
    setTimeout(() => msg.remove(), 4000);
  });
}

commentLikes.forEach((button) => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('i');
    if (!icon) return;
    const text = button.textContent.trim();
    const numMatch = text.match(/\d+/);
    const base = numMatch ? Number.parseInt(numMatch[0], 10) : 0;
    const liked = button.classList.toggle('liked');
    const newCount = liked ? base + 1 : Math.max(0, base - 1);
    button.innerHTML = '';
    icon.classList.toggle('fa-regular', !liked);
    icon.classList.toggle('fa-solid', liked);
    button.appendChild(icon);
    button.appendChild(document.createTextNode(' ' + newCount));
  });
});
