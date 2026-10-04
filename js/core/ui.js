// ui.js: small reusable helpers for changing what's on screen.

export function showFieldError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add("input-error");
  inputElement.setAttribute("aria-invalid", "true");
}

export function clearFieldError(inputElement, errorElement) {
  errorElement.textContent = "";
  inputElement.classList.remove("input-error");
  inputElement.removeAttribute("aria-invalid");
}