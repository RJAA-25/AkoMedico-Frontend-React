import { api } from "./_axios";

export const createPrescription = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, prescriptions },
    } = await api.post(`/prescriptions/create/${uid}`, formData);
    return { status, message, prescriptions };
  } catch (error) {
    console.log(error);
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyPrescription = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, prescriptions },
    } = await api.patch(`/prescriptions/destroy/${uid}`, formData);
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
