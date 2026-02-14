const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scroll-top");
const reveals = document.querySelectorAll(".reveal");
const likeButtons = document.querySelectorAll(".like-btn");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const onScroll = () => {
  const scrollY = window.scrollY;

  if (navbar) {
    navbar.classList.toggle("scrolled", scrollY > 30);
  }

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("show", scrollY > 320);
  }

  const fromTop = scrollY + 120;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;

    const isActive =
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop;

    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", onScroll);
onScroll();

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("i");
    const countEl = button.querySelector(".like-count");
    if (!countEl || !icon) return;

    const base = Number.parseInt(countEl.textContent || "0", 10);
    const liked = button.classList.toggle("liked");

    countEl.textContent = String(liked ? base + 1 : Math.max(0, base - 1));
    icon.classList.toggle("fa-regular", !liked);
    icon.classList.toggle("fa-solid", liked);
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Iltimos, barcha maydonlarni to'ldiring.";
      formMessage.style.color = "#b91c1c";
      return;
    }

    formMessage.textContent = "Xabaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz.";
    formMessage.style.color = "#0f766e";
    contactForm.reset();
  });
}
