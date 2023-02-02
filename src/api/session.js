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

export const logoutUser = async () => {
  try {
    const {
      status,
      data: { message },
    } = await api.post("/logout");
    return { status, message };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const checkAccess = async () => {
  try {
    const {
      status,
      data: { user, profile },
    } = await api.get("/requests/access");
    return { status, user, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};
