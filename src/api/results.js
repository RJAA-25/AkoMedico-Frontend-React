import { api } from "./_axios";

export const createResult = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, results },
    } = await api.post(`/results/create/${uid}`, formData);
    return { status, message, results };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateResult = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, results },
    } = await api.patch(`/results/update/${uid}`, formData);
    return { status, message, results };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};
