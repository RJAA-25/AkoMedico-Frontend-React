import { toast } from "react-hot-toast";

import { initOverview } from "../../api/initial";
import { forceLogout } from "../functions/global";
import { admissionActions } from "../../store/admission";
import { conditionActions } from "../../store/condition";
import { consultationActions } from "../../store/consultation";
import { contactActions } from "../../store/contact";
import { doctorActions } from "../../store/doctor";
import { profileActions } from "../../store/profile";
import { userActions } from "../../store/user";

export const fetchOverview = async ({ dispatch, navigate, setPageLoading }) => {
  const res = await initOverview();
  setPageLoading(false);

  switch (res.status) {
    case 200:
      const {
        user,
        profile,
        contacts,
        conditions,
        doctors,
        consultations,
        admissions,
      } = res;
      dispatch(userActions.set(user));
      dispatch(profileActions.set(profile));
      dispatch(contactActions.set(contacts));
      dispatch(conditionActions.set(conditions));
      dispatch(doctorActions.set(doctors));
      dispatch(consultationActions.set(consultations));
      dispatch(admissionActions.set(admissions));
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

    case 403:
      toast(res.error);
      navigate("/confirmation", { replace: true });
      break;

    default:
      toast.error(res.message);
  }
};
