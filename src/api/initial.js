import { api } from "./_axios";

export const initAccess = async () => {
  try {
    const {
      status,
      data: { user, profile },
    } = await api.get("/requests/access");
    return { status, user, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initOverview = async () => {
  try {
    const { status, data } = await api.get("/requests/overview");
    return { status, ...data };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initProfile = async () => {
  try {
    const {
      status,
      data: { profile },
    } = await api.get("/requests/profile");
    return { status, profile };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initDoctors = async () => {
  try {
    const {
      status,
      data: { doctors },
    } = await api.get("/requests/doctors");
    return { status, doctors };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initContacts = async () => {
  try {
    const {
      status,
      data: { contacts },
    } = await api.get("/requests/emergency-contacts");
    return { status, contacts };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initConditions = async () => {
  try {
    const {
      status,
      data: { conditions },
    } = await api.get("/requests/existing-conditions");
    return { status, conditions };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initConsultations = async () => {
  try {
    const {
      status,
      data: { consultations },
    } = await api.get("/requests/consultations");
    return { status, consultations };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};

export const initAdmissions = async () => {
  try {
    const {
      status,
      data: { admissions },
    } = await api.get("/requests/admissions");
    return { status, admissions };
  } catch (error) {
    if (error.response) {
      const {
        response: { status, data },
      } = error;
      return { status, error: data.error };
    } else return error;
  }
};
