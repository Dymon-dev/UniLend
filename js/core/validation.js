const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(09|\+639)\d{9}$/;

export function validateFullName(value) {
  const name = value.trim();          
  if (name.length < 2) {
    return "Please enter your full name.";
  }
  return "";                           
}

export function validateEmail(value) {
    const email = value.trim().toLowerCase();

    if (email === "") {
        return "Please enter your university email.";
    }

    if (!EMAIL_PATTERN.test(email)) {
        return "Please enter a valid university email";
    }

    if (!email.endsWith(".edu.ph")) {
        return "Use your university email address, like username@mseuf.edu.ph";
    }
    return "";
}

export function validatePhone(value) {
    const phone = value.replace(/[\s-]/g, "");
    if (!PHONE_PATTERN.test(phone)) {
        return "Please enter a PH valid phone number, like 09123456789 or +639123456789.";
    }
    return "";
}

export function validatePassword(value) {
  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (value.length < 8 || !hasLetter || !hasNumber) {
    return "Password needs at least 8 characters, a letter, and a number.";
  }
  return "";
}