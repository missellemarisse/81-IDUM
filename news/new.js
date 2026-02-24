const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const reveals = document.querySelectorAll('.reveal');
const likeButtons = document.querySelectorAll('.like-btn');
const year = document.getElementById('year');
const allNewsBtn = document.getElementById('all-news-btn');
const extraNews = document.getElementById('extra-news');

const commentModal = document.getElementById('comment-modal');
const commentClose = document.getElementById('comment-close');
const commentModalImage = document.getElementById('comment-modal-image');
const commentModalTitle = document.getElementById('comment-modal-title');
const commentModalList = document.getElementById('comment-modal-list');
const commentModalEmpty = document.getElementById('comment-modal-empty');
const commentModalForm = document.getElementById('comment-modal-form');
const commentModalInput = document.getElementById('comment-modal-input');

const newsCards = document.querySelectorAll('.news-card');
const commentsStore = {};
let activeNewsId = null;

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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const icon = button.querySelector('i');
    const countEl = button.querySelector('.like-count');
    if (!countEl || !icon) return;

    const base = Number.parseInt(countEl.textContent || '0', 10);
    const liked = button.classList.toggle('liked');

    countEl.textContent = String(liked ? base + 1 : Math.max(0, base - 1));
    icon.classList.toggle('fa-regular', !liked);
    icon.classList.toggle('fa-solid', liked);
  });
});

const renderComments = () => {
  if (!activeNewsId || !commentModalList || !commentModalEmpty) return;

  const items = commentsStore[activeNewsId] || [];
  commentModalList.innerHTML = '';

  if (items.length === 0) {
    commentModalEmpty.style.display = 'block';
    return;
  }

  commentModalEmpty.style.display = 'none';

  items.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    commentModalList.appendChild(li);
  });
};

const updateCommentCount = (newsId) => {
  const count = (commentsStore[newsId] || []).length;
  const card = document.querySelector(`.news-card[data-news-id="${newsId}"]`);
  const countEl = card?.querySelector('.comment-count');
  if (countEl) {
    countEl.textContent = String(count);
  }
};

const openCommentModal = (card, newsId) => {
  if (!commentModal) return;

  activeNewsId = newsId;

  const img = card.querySelector('img');
  const title = card.querySelector('h3');

  if (commentModalImage && img) {
    commentModalImage.src = img.src;
    commentModalImage.alt = img.alt || 'Yangilik rasmi';
  }

  if (commentModalTitle && title) {
    commentModalTitle.textContent = `${title.textContent} - Izohlar`;
  }

  renderComments();
  commentModal.classList.add('open');
  commentModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  commentModalInput?.focus();
};

const closeCommentModal = () => {
  if (!commentModal) return;
  commentModal.classList.remove('open');
  commentModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeNewsId = null;
};

newsCards.forEach((card, index) => {
  const newsId = String(index + 1);
  card.dataset.newsId = newsId;
  commentsStore[newsId] = [];

  const countEl = card.querySelector('.comment-count');
  const trigger = countEl?.parentElement;

  if (!trigger) return;

  trigger.classList.add('comment-trigger');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');

  trigger.addEventListener('click', () => openCommentModal(card, newsId));
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCommentModal(card, newsId);
    }
  });
});

if (commentModalForm && commentModalInput) {
  commentModalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!activeNewsId) return;

    const text = commentModalInput.value.trim();
    if (!text) return;

    commentsStore[activeNewsId].unshift(text);
    updateCommentCount(activeNewsId);
    renderComments();
    commentModalInput.value = '';
    commentModalInput.focus();
  });
}

if (commentClose) {
  commentClose.addEventListener('click', closeCommentModal);
}

if (commentModal) {
  commentModal.addEventListener('click', (event) => {
    if (event.target === commentModal) {
      closeCommentModal();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && commentModal?.classList.contains('open')) {
    closeCommentModal();
  }
});

if (allNewsBtn && extraNews) {
  allNewsBtn.addEventListener('click', () => {
    const isOpen = extraNews.classList.toggle('open');
    extraNews.setAttribute('aria-hidden', String(!isOpen));
    allNewsBtn.textContent = isOpen ? 'Yopish' : 'Barcha yangiliklar';
  });
}
