import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { contactActions } from "../../store/contact";
import { conditionActions } from "../../store/condition";
import { doctorActions } from "../../store/doctor";
import { consultationActions } from "../../store/consultation";
import { admissionActions } from "../../store/admission";
import { logoutUser } from "../../api/session";
import { toast } from "react-hot-toast";
import { deleteCookie } from "../../helpers/utilities";

export const forceLogout = (dispatch, navigate) => {
  dispatch(authActions.logout());
  dispatch(userActions.reset());
  dispatch(profileActions.reset());
  dispatch(contactActions.reset());
  dispatch(conditionActions.reset());
  dispatch(doctorActions.reset());
  dispatch(consultationActions.reset());
  dispatch(admissionActions.reset());
  deleteCookie("access_token");
  navigate("/login", { replace: true });
};

export const logoutSession = async (dispatch, navigate) => {
  const res = await logoutUser();
  forceLogout(dispatch, navigate);
  toast.success(res.message);
};
