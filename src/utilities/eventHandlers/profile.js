import { toast } from "react-hot-toast";

import { initAccess } from "../../api/initial";
import { forceLogout } from "../functions/global";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";

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
