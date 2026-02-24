const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const reveals = document.querySelectorAll('.reveal');
const statNums = document.querySelectorAll('.stat-num');
const year = document.getElementById('year');

if (year) {
  year.textContent = String(new Date().getFullYear());
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
  const scrollY = window.scrollY;

  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 30);
  }

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', scrollY > 320);
  }
};

window.addEventListener('scroll', onScroll);
onScroll();

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((item) => revealObserver.observe(item));

  const statsSection = document.querySelector('.teachers-stats-section');
  let started = false;

  if (statsSection && statNums.length) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;

            statNums.forEach((numEl) => {
              const target = Number(numEl.dataset.target || '0');
              const duration = 1400;
              const startTime = performance.now();

              const step = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                numEl.textContent = String(Math.floor(eased * target));

                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  numEl.textContent = String(target);
                }
              };

              requestAnimationFrame(step);
            });

            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.28 }
    );

    statsObserver.observe(statsSection);
  }
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}
