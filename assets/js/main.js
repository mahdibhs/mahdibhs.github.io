/**
 * main.js — comportements communs à toutes les pages
 * - Menu mobile
 * - Révélation au scroll (Intersection Observer)
 * - Année du footer
 * - Barres de compétences animées (si présentes sur la page)
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initScrollReveal();
  initFooterYear();
  initSkillBars();
  initHeaderShadowOnScroll();
});

/* ---------- Menu mobile ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Ferme le menu quand on clique un lien (mobile)
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Révélation progressive au scroll ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Légère ombre sur le header au scroll ---------- */
function initHeaderShadowOnScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 8 ? "var(--shadow-sm)" : "none";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Année dynamique dans le footer ---------- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Barres de progression des compétences ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".progress-fill");
  if (!bars.length) return;

  if (!("IntersectionObserver" in window)) {
    bars.forEach((bar) => (bar.style.width = bar.dataset.level + "%"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.level + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}
