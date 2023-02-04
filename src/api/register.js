import { api } from "./_axios";

export const registerUser = async (formData) => {
  try {
    const { status, data } = await api.post("/register", formData);
    return { status, message: data.message };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors };
    } else return error;
  }
};
