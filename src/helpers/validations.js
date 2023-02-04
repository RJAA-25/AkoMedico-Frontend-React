import { emailRegex, dateRegex } from "./form";

export const checkNotEmpty = (input, title) => {
  let text = input.trim();
  return text.length === 0 ? `${title} can't be blank` : "";
};

export const checkPassword = (input) => {
  let password = input.trim();
  return password.length === 0
    ? "Password can't be blank"
    : password.length < 6
    ? "Password must be at least 6 characters"
    : "";
};

export const checkEmail = (input) => {
  let email = input.trim();
  if (email.length === 0) return "Email can't be blank";
  return !emailRegex.test(email) ? "Email format is invalid" : "";
};

export const checkContact = (input) => {
  let contact = input.trim();
  if (contact.length === 0) return "Contact Number can't be blank";
  return contact.length < 7 || contact.length > 15
    ? "Contact Number format is invalid"
    : "";
};

export const checkNumber = (input, title, unit, min, max) => {
  let number = Number(input);
  if (input === "") return `${title} can't be blank`;
  return number <= min
    ? `${title} must be greater than ${min} ${unit}`
    : number >= max
    ? `${title} must be less than ${max} ${unit}`
    : "";
};

export const checkAge = (input) => {
  if (!dateRegex.test(input)) return "Date format is invalid";
  let today = new Date();
  let birthdate = new Date(input);
  let age = (today - birthdate) / (1000 * 60 * 60 * 24 * 365);
  return age < 18 ? "You must be at least 18 years old to continue" : "";
};

export const checkDate = (input, min, max) => {
  if (!dateRegex.test(input)) return "Date format is invalid";
  let date = new Date(input);
  let end = new Date(max);

  if (min) {
    let start = new Date(min);
    return date < start
      ? `Date must be greater than ${start.toLocaleDateString()}`
      : date > end
      ? `Date must be less than ${end.toLocaleDateString()}`
      : "";
  }

  return date > end ? `Date must be less than ${end.toLocaleDateString()}` : "";
};
