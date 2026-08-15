/**
 * effects.js — effets visuels avancés
 * (mode sombre, barre de progression, tilt 3D, boutons magnétiques, machine à écrire)
 *
 * Tous les effets basés sur le mouvement respectent `prefers-reduced-motion`
 * et sont désactivés sur les appareils tactiles (pas de mousemove pertinent).
 */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasHover = window.matchMedia("(hover: hover)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initScrollProgress();
  if (!prefersReducedMotion && hasHover) {
    initTilt();
    initMagneticButtons();
  }
  initTypewriter();
});

/* ================= Mode sombre / clair ================= */
function initThemeToggle() {
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  syncButton(document.documentElement.getAttribute("data-theme") === "dark");

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* stockage indisponible (navigation privée…) : on continue sans persister */
    }
    syncButton(next === "dark");
  });

  function syncButton(isDark) {
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.setAttribute("aria-label", isDark ? "Passer en mode clair" : "Passer en mode sombre");
  }
}

/* ================= Barre de progression de lecture ================= */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    bar.style.width = pct + "%";
    ticking = false;
  }

  document.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}

/* ================= Tilt 3D au survol ================= */
function initTilt() {
  const cards = document.querySelectorAll(".highlight-card, .skill-card, .project-card");
  const MAX_TILT = 10; // degrés — rendu "marqué" mais qui reste lisible

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * MAX_TILT;
      const rotateY = ((x - centerX) / centerX) * MAX_TILT;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ================= Boutons magnétiques ================= */
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn");
  const STRENGTH = 0.35;

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ================= Machine à écrire (hero) ================= */
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const roles = ["Développeur Web", "Développeur PHP", "Développeur Flutter", "Intégrateur WordPress"];

  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 75);
  }

  tick();
}
