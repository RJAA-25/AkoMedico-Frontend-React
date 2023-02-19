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
