import { api, config } from "./_axios";

export const createCondition = async (formData) => {
  try {
    const {
      status,
      data: { message, condition },
    } = await api.post("/conditions/create", formData, config());
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

export const updateCondition = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, condition },
    } = await api.patch(`/conditions/update/${uid}`, formData, config());
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

export const destroyCondition = async (uid) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/conditions/destroy/${uid}`, config());
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
