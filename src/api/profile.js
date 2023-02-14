import { api } from "./_axios";

export const createProfile = async (formData) => {
  try {
    const {
      status,
      data: { message, profile },
    } = await api.post("/profiles/create", formData);
    return { status, message, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const {
      status,
      data: { message, profile },
    } = await api.patch("/profiles/update", formData);
    return { status, message, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      console.log(error.response);
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};
