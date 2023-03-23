import { api, config } from "./_axios";

export const createAbstract = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, abstracts },
    } = await api.post(`/abstracts/create/${uid}`, formData, config());
    return { status, message, abstracts };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateAbstract = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, abstracts },
    } = await api.patch(`/abstracts/update/${uid}`, formData, config());
    return { status, message, abstracts };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};
