import { toast } from "react-hot-toast";

import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";

import { createProfile } from "../../api/profile";
import { getFormData } from "../../helpers/utilities";
import { initAccess } from "../../api/initial";
import { forceLogout } from "../functions/global";

export const handleSubmit = async (e, { dispatch, navigate, setLoading }) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#profile");
  const res = await createProfile(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, profile } = res;
      toast.success(message);
      dispatch(profileActions.set(profile));
      navigate("/overview", { replace: true });
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

export const fetchData = async ({ dispatch, navigate, setPageLoading }) => {
  const res = await initAccess();
  setPageLoading(false);

  switch (res.status) {
    case 200:
      const { user, profile } = res;
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      if (!user.email_confirmed) {
        navigate("/confirmation", { replace: true });
      } else {
        if (profile) navigate("/overview", { replace: true });
      }
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    default:
      toast.error(res.message);
  }
};
