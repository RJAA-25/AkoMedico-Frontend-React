import { api } from "./_axios";

export const createContact = async (formData) => {
  try {
    const {
      status,
      data: { message, emergency_contact },
    } = await api.post("/emergency-contacts/create", formData);
    return { status, message, emergency_contact };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const updateContact = async (formData, uid) => {
  try {
    const {
      status,
      data: { message, emergency_contact },
    } = await api.patch(`/emergency-contacts/update/${uid}`, formData);
    return { status, message, emergency_contact };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, errors: data.errors, error: data.error };
    } else return error;
  }
};

export const destroyContact = async (uid) => {
  try {
    const {
      status,
      data: { message },
    } = await api.delete(`/emergency-contacts/destroy/${uid}`);
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
