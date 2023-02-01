import { api } from "./_axios";

export const loginUser = async (formData) => {
  try {
    const {
      status,
      data: { message, user, profile },
    } = await api.post("/login", formData);
    return { status, message, user, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};
