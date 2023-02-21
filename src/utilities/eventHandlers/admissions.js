import { toast } from "react-hot-toast";

import { initAccess, initAdmissions, initDoctors } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { doctorActions } from "../../store/doctor";
import { admissionActions } from "../../store/admission";
import { forceLogout } from "../functions/global";
import { getFormData } from "../../helpers/utilities";
import {
  createAdmission,
  destroyAdmission,
  updateAdmission,
} from "../../api/admissions";

export const fetchAdmissions = async ({
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
        const { admissions } = await initAdmissions();
        const { doctors } = await initDoctors();
        dispatch(doctorActions.set(doctors));
        dispatch(admissionActions.set(admissions));
        setPageLoading(false);
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
  const formData = getFormData("#admission");
  const res = await createAdmission(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, admission } = res;
      toast.success(message);
      dispatch(admissionActions.set([...data, admission]));
      navigate(`/admissions/${admission.uid}`);
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
  const formData = getFormData("#admission");
  const res = await updateAdmission(formData, uid);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, admission } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      const index = data.map((admit) => admit.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1, admission);
      dispatch(admissionActions.set(newData));
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
  const res = await destroyAdmission(uid);

  switch (res.status) {
    case 200:
      const { message } = res;
      toast.success(message);
      const index = data.map((admit) => admit.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1);
      dispatch(admissionActions.set(newData));
      navigate("/admissions", { replace: true });
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
