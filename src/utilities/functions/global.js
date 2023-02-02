import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { contactActions } from "../../store/contact";
import { conditionActions } from "../../store/condition";
import { doctorActions } from "../../store/doctor";
import { consultationActions } from "../../store/consultation";
import { admissionActions } from "../../store/admission";

export const forceLogout = (dispatch, navigate) => {
  dispatch(authActions.logout());
  dispatch(userActions.reset());
  dispatch(profileActions.reset());
  dispatch(contactActions.reset());
  dispatch(conditionActions.reset());
  dispatch(doctorActions.reset());
  dispatch(consultationActions.reset());
  dispatch(admissionActions.reset());
  navigate("/login", { replace: true });
};
