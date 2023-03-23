import { api, config } from "./_axios";

export const loginUser = async (formData) => {
  try {
    const {
      status,
      data: { message, user, expiry, access_token, profile },
    } = await api.post("/login", formData);
    return { status, message, user, expiry, access_token, profile };
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
    } = await api.post("/logout", null, config());
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
