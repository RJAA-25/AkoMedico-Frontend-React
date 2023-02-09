import { toast } from "react-hot-toast";

import { initAccess, initAdmissions } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { admissionActions } from "../../store/admission";
import { forceLogout } from "../functions/global";

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
        setPageLoading(false);
        dispatch(admissionActions.set(admissions));
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
