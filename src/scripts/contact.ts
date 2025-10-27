export function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (status) {
        status.textContent =
          "⚠️ Por ahora este formulario no envía correos. Pronto estará habilitado.";
        status.classList.add("text-yellow-600");
      }

      form.reset();
    });
  }
}
