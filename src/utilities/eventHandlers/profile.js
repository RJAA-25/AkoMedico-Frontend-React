import { toast } from "react-hot-toast";

import { initAccess } from "../../api/initial";
import { forceLogout } from "../functions/global";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { getFormData } from "../../helpers/utilities";
import { updateProfile } from "../../api/profile";

export const fetchProfile = async ({ dispatch, navigate, setPageLoading }) => {
  const res = await initAccess();
  setPageLoading(false);

  switch (res.status) {
    case 200:
      const { user, profile } = res;
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      !user.email_confirmed
        ? navigate("/confirmation", { replace: true })
        : !profile
        ? navigate("/get-started", { replace: true })
        : null;
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    default:
      toast.error(res.message);
  }
};

export const handleUpdate = async (
  e,
  { dispatch, navigate, setLoading, setError, setReadOnly }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#profile");
  const res = await updateProfile(formData);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, profile } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      dispatch(profileActions.set(profile));
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
