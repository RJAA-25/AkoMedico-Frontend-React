import { toast } from "react-hot-toast";

import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";

import { resendConfirmation } from "../../api/confirmation";
import { logoutUser, checkAccess } from "../../api/session";
import { forceLogout } from "../functions/global";

export const handleResend = async ({ dispatch, navigate, setLoading }) => {
  toast.dismiss();
  setLoading("resend");
  const res = await resendConfirmation();
  setLoading("");

  switch (res.status) {
    case 200:
      toast(res.message);
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

export const handleLogout = async ({ dispatch, navigate, setLoading }) => {
  toast.dismiss();
  setLoading("logout");
  const res = await logoutUser();
  setLoading("");

  switch (res.status) {
    case 200:
      toast.success(res.message);
      dispatch(authActions.logout());
      dispatch(userActions.reset());
      dispatch(profileActions.reset());
      navigate("/login", { replace: true });
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
  const res = await checkAccess();
  setPageLoading(false);

  switch (res.status) {
    case 200:
      const { user, profile } = res;
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      if (user.email_confirmed) {
        profile
          ? navigate("/overview", { replace: true })
          : navigate("/get-started", { replace: true });
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
