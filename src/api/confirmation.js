import { api, config } from "./_axios";

export const resendConfirmation = async () => {
  try {
    const {
      status,
      data: { message },
    } = await api.post("/confirmations/resend", null, config());
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
