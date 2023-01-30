export const getCookie = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const generateKey = () => {
  return (Math.random() + 1).toString(36).substring(7);
};
