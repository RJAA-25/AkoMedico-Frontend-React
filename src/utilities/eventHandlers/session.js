import { toast } from "react-hot-toast";
import { loginUser } from "../../api/session";
import { getFormData, setCookie } from "../../helpers/utilities";
import { authActions } from "../../store/auth";
import { profileActions } from "../../store/profile";
import { userActions } from "../../store/user";

export const handleSubmit = async (
  e,
  { navigate, dispatch, setLoading, setError }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#session");
  const res = await loginUser(formData);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, user, expiry, access_token, profile } = res;
      toast.success(message);
      setCookie("access_token", access_token, expiry);
      dispatch(authActions.login());
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      !user.email_confirmed
        ? navigate("/confirmation")
        : !profile
        ? navigate("/get-started")
        : navigate("/overview");
      break;

    case 401:
      toast.error(res.error);
      setError(res.error);
      break;

    default:
      toast.error(res.message);
  }
};
