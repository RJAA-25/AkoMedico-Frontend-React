import { api } from "./_axios";

export const createPrescription = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, prescriptions },
    } = await api.post(`/prescriptions/create/${uid}`, formData);
    return { status, message, prescriptions };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updatePrescription = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, prescriptions },
    } = await api.patch(`/prescriptions/update/${uid}`, formData);
    return { status, message, prescriptions };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};
