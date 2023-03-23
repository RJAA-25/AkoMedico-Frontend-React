import { api, config } from "./_axios";

export const createConsultation = async (formData) => {
  try {
    const {
      status,
      data: { message, consultation },
    } = await api.post("/consultations/create", formData, config());
    return { status, message, consultation };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateConsultation = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, consultation },
    } = await api.patch(`/consultations/update/${uid}`, formData, config());
    return { status, message, consultation };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyConsultation = async (uid) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/consultations/destroy/${uid}`, config());
    return { status, message };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};
