import { toast } from "react-hot-toast";

import { initAccess, initContacts } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { contactActions } from "../../store/contact";
import { forceLogout } from "../functions/global";

export const fetchContacts = async ({ dispatch, navigate, setPageLoading }) => {
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
        const { contacts } = await initContacts();
        setPageLoading(false);
        dispatch(contactActions.set(contacts));
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
