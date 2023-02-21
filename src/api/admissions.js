import { api } from "./_axios";

export const createAdmission = async (formData) => {
  try {
    const {
      status,
      data: { message, admission },
    } = await api.post("/admissions/create", formData);
    return { status, message, admission };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateAdmission = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, admission },
    } = await api.patch(`/admissions/update/${uid}`, formData);
    return { status, message, admission };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyAdmission = async (uid) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/admissions/destroy/${uid}`);
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
