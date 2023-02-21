import { toast } from "react-hot-toast";

import { initAccess, initConsultations, initDoctors } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { consultationActions } from "../../store/consultation";
import { doctorActions } from "../../store/doctor";
import { forceLogout } from "../functions/global";
import { getFormData } from "../../helpers/utilities";
import {
  createConsultation,
  destroyConsultation,
  updateConsultation,
} from "../../api/consultations";

export const fetchConsultations = async ({
  dispatch,
  navigate,
  setPageLoading,
}) => {
  const res = await initAccess();

  switch (res.status) {
    case 200:
      const { user, profile } = res;
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      if (!user.email_confirmed) {
        navigate("/confirmation", { replace: true });
        break;
      } else if (!profile) {
        navigate("/get-started", { replace: true });
        break;
      } else {
        const { consultations } = await initConsultations();
        const { doctors } = await initDoctors();
        dispatch(doctorActions.set(doctors));
        setPageLoading(false);
        dispatch(consultationActions.set(consultations));
        break;
      }

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    default:
      toast.error(res.message);
  }
};

export const handleCreate = async (
  e,
  { dispatch, navigate, setLoading, setError, data }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#consultation");
  const res = await createConsultation(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, consultation } = res;
      toast.success(message);
      dispatch(consultationActions.set([...data, consultation]));
      navigate(`/consultations/${consultation.uid}`);
      break;

    case 400:
      toast(res.error);
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    case 422:
      toast.error("Invalid input");
      setError(res.errors);
      break;

    default:
      toast.error(res.message);
  }
};

export const handleUpdate = async (
  e,
  { dispatch, navigate, setLoading, setError, setReadOnly, data, uid }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#consultation");
  const res = await updateConsultation(formData, uid);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, consultation } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      const index = data.map((consult) => consult.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1, consultation);
      dispatch(consultationActions.set(newData));
      break;

    case 400:
      toast(res.error);
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    case 422:
      toast.error("Invalid input");
      setError(res.errors);
      break;

    default:
      toast.error(res.message);
  }
};

export const handleDelete = async ({ dispatch, navigate, data, uid }) => {
  toast.dismiss();
  const res = await destroyConsultation(uid);

  switch (res.status) {
    case 200:
      const { message } = res;
      toast.success(message);
      const index = data.map((consultation) => consultation.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1);
      dispatch(consultationActions.set(newData));
      navigate("/consultations", { replace: true });
      break;

    case 400:
      toast(res.error);
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    default:
      toast.error(res.message);
  }
};
