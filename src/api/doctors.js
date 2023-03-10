import { api } from "./_axios";

export const createDoctor = async (formData) => {
  try {
    const {
      status,
      data: { message, doctor },
    } = await api.post("/doctors/create", formData);
    return { status, message, doctor };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateDoctor = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, doctor },
    } = await api.patch(`/doctors/update/${uid}`, formData);
    return { status, message, doctor };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyDoctor = async (uid) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/doctors/destroy/${uid}`);
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
