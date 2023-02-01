export const getCookie = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const generateKey = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getFormData = (formId) => {
  const form = document.querySelector(formId);
  // const formData = new FormData(form);
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }
  return new FormData(form);
};
