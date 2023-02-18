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

export const updateDoctor = async (formData, id) => {
  try {
    const {
      status,
      data: { message, doctor },
    } = await api.patch(`/doctors/update/${id}`, formData);
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

export const destroyDoctor = async (id) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/doctors/destroy/${id}`);
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
