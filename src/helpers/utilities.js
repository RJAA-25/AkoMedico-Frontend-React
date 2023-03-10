export const getCookie = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const generateKey = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getFormData = (formId) => {
  const form = document.querySelector(formId);
  return new FormData(form);
};

export const computeAge = (date) => {
  const today = new Date();
  const birthdate = new Date(date);
  const age = (today - birthdate) / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(age);
};

export const formatDate = (input, type) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const testDate = new Date(input);
  const year = testDate.getFullYear();
  const month = months[testDate.getMonth()];
  const date = testDate.getDate();
  if (type === "estimate") return `${month} ${year}`;
  if (type === "exact") return `${month} ${date}, ${year}`;
};
