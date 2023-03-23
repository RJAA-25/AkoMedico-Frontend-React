import { api, config } from "./_axios";

export const initAccess = async () => {
  try {
    const {
      status,
      data: { user, profile },
    } = await api.get("/requests/access", config());
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
    const { status, data } = await api.get("/requests/overview", config());
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

export const initDoctors = async () => {
  try {
    const {
      status,
      data: { doctors },
    } = await api.get("/requests/doctors", config());
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
    } = await api.get("/requests/emergency-contacts", config());
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
    } = await api.get("/requests/existing-conditions", config());
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
    } = await api.get("/requests/consultations", config());
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
    } = await api.get("/requests/admissions", config());
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
