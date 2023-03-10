import { toast } from "react-hot-toast";

import { initAccess, initDoctors } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { doctorActions } from "../../store/doctor";
import { forceLogout } from "../functions/global";
import { getFormData } from "../../helpers/utilities";
import { createDoctor, destroyDoctor, updateDoctor } from "../../api/doctors";

export const fetchDoctors = async ({ dispatch, navigate, setPageLoading }) => {
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
        const { doctors } = await initDoctors();
        setPageLoading(false);
        dispatch(doctorActions.set(doctors));
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
  const formData = getFormData("#doctor");
  const res = await createDoctor(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, doctor } = res;
      toast.success(message);
      dispatch(doctorActions.set([...data, doctor]));
      navigate(`/doctors/${doctor.uid}`);
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
  const formData = getFormData("#doctor");
  const res = await updateDoctor(formData, uid);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, doctor } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      const index = data.map((doc) => doc.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1, doctor);
      dispatch(doctorActions.set(newData));
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
  const res = await destroyDoctor(uid);

  switch (res.status) {
    case 200:
      const { message } = res;
      toast.success(message);
      const index = data.map((doc) => doc.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1);
      dispatch(doctorActions.set(newData));
      navigate("/doctors", { replace: true });
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
