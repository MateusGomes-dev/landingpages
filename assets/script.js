/* ==========================================================================
   GARDEN EVENTOS — SCRIPT PRINCIPAL
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initLightbox();
});

/* ---------- Navbar: fica sólida ao rolar ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const toggleNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  toggleNavbar();
  window.addEventListener("scroll", toggleNavbar, { passive: true });
}

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("navMobile");
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.classList.toggle("is-active", isOpen);
  });

  // Fecha o menu ao clicar em um link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Scroll suave para links internos ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[data-scroll], .navbar__links a, .navbar__mobile a').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ---------- Revelar elementos suavemente ao rolar ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- Lightbox da galeria ---------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const galleryItems = document.querySelectorAll("[data-lightbox]");

  if (!lightbox || !lightboxImage || !galleryItems.length) return;

  const openLightbox = (item) => {
    const img = item.querySelector("img");
    if (!img) return;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = item.dataset.caption || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}