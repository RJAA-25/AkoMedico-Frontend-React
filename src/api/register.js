import { api } from "./_axios";

export const registerUser = async (formData) => {
  try {
    const res = await api.post("/register", formData);
    const { status, data } = res;
    return { status, message: data.message };
  } catch (error) {
    console.log(error);
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors };
    } else return error;
  }
};
