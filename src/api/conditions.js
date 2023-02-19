import { api } from "./_axios";

export const createCondition = async (formData) => {
  try {
    const {
      status,
      data: { message, condition },
    } = await api.post("/conditions/create", formData);
    return { status, message, condition };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateCondition = async (formData, id) => {
  try {
    const {
      status,
      data: { message, condition },
    } = await api.patch(`/conditions/update/${id}`, formData);
    return { status, message, condition };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyCondition = async (id) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/conditions/destroy/${id}`);
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
