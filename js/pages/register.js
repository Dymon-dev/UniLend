// register.js: connects the Create Account form to validation and storage.

import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePassword,
} from "../core/validation.js";
import { showFieldError, clearFieldError } from "../core/ui.js";
import { registerUser } from "../core/auth.js";

const form = document.getElementById("register-form");
const successPanel = document.getElementById("register-success");
const submitButton = form.querySelector("button[type='submit']");

const REDIRECT_DELAY_MS = 2000;
const NEXT_PAGE = "verify.html";

// One entry per field: its input, its error <p>, and its validator function.
const fields = [
  {
    input: document.getElementById("name"),
    error: document.getElementById("name-error"),
    validate: validateFullName,
  },
  {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate: validateEmail,
  },
  {
    input: document.getElementById("phone"),
    error: document.getElementById("phone-error"),
    validate: validatePhone,
  },
  {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
    validate: validatePassword,
  },
];

// Checks every field, shows or clears each error, and returns the
// first invalid input (or null when everything is valid).
function validateAllFields() {
  let firstInvalidInput = null;

  for (const field of fields) {
    const message = field.validate(field.input.value);

    if (message !== "") {
      showFieldError(field.input, field.error, message);
      if (!firstInvalidInput) {
        firstInvalidInput = field.input;
      }
    } else {
      clearFieldError(field.input, field.error);
    }
  }

  return firstInvalidInput;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstInvalidInput = validateAllFields();
  if (firstInvalidInput) {
    firstInvalidInput.focus();
    return; // stop here: don't register an invalid form
  }

  registerUser({
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  });

  submitButton.disabled = true;
  successPanel.hidden = false;

  setTimeout(() => {
    window.location.href = NEXT_PAGE;
  }, REDIRECT_DELAY_MS);
});