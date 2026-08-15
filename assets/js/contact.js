/**
 * contact.js — validation du formulaire de contact
 *
 * GitHub Pages n'exécute aucun code serveur : ce formulaire valide
 * les champs côté client puis ouvre le client mail de l'utilisateur
 * (mailto:) avec le message pré-rempli. Pour un envoi silencieux,
 * remplacez la fonction submitForm par un appel à un service tiers
 * (Formspree, EmailJS, etc.).
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    subject: form.querySelector("#subject"),
    message: form.querySelector("#message"),
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    let isValid = true;
    isValid = validateField(fields.name, (v) => v.length >= 2, "Veuillez indiquer votre nom.") && isValid;
    isValid = validateField(fields.email, isValidEmail, "Veuillez indiquer un email valide.") && isValid;
    isValid = validateField(fields.subject, (v) => v.length >= 3, "Veuillez indiquer un sujet.") && isValid;
    isValid = validateField(fields.message, (v) => v.length >= 10, "Votre message doit contenir au moins 10 caractères.") && isValid;

    if (!isValid) {
      status.textContent = "Merci de corriger les champs signalés.";
      status.classList.add("error");
      return;
    }

    submitForm(fields);
  });

  function validateField(input, test, message) {
    const errorEl = document.getElementById(input.id + "-error");
    const value = input.value.trim();
    if (!test(value)) {
      if (errorEl) errorEl.textContent = message;
      input.setAttribute("aria-invalid", "true");
      return false;
    }
    if (errorEl) errorEl.textContent = "";
    input.removeAttribute("aria-invalid");
    return true;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function submitForm(fields) {
    const to = "mahdi.belhadjsassi@example.com"; // TODO: remplacez par votre email réel
    const subject = encodeURIComponent(`[Portfolio] ${fields.subject.value.trim()}`);
    const body = encodeURIComponent(
      `Nom : ${fields.name.value.trim()}\nEmail : ${fields.email.value.trim()}\n\n${fields.message.value.trim()}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    status.textContent = "Votre client mail va s'ouvrir pour envoyer le message. Merci !";
    status.classList.add("success");
    form.reset();
  }
});
