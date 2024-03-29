import { toast } from "react-hot-toast";

import { initAccess, initContacts } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { contactActions } from "../../store/contact";
import { forceLogout } from "../functions/global";
import { getFormData } from "../../helpers/utilities";
import {
  createContact,
  destroyContact,
  updateContact,
} from "../../api/contacts";

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

export const handleCreate = async (
  e,
  { dispatch, navigate, setLoading, setError, data }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#emergency_contact");
  const res = await createContact(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, emergency_contact } = res;
      toast.success(message);
      dispatch(contactActions.set([...data, emergency_contact]));
      navigate(`/emergency-contacts/${emergency_contact.uid}`);
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

export const handleUpdate = async (
  e,
  { dispatch, navigate, setLoading, setError, setReadOnly, data, uid }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#emergency_contact");
  const res = await updateContact(formData, uid);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, emergency_contact } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      const index = data.map((contact) => contact.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1, emergency_contact);
      dispatch(contactActions.set(newData));
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

export const handleDelete = async ({ dispatch, navigate, data, uid }) => {
  toast.dismiss();
  const res = await destroyContact(uid);

  switch (res.status) {
    case 200:
      const { message } = res;
      toast.success(message);
      const index = data.map((contact) => contact.uid).indexOf(uid);
      const newData = [...data];
      newData.splice(index, 1);
      dispatch(contactActions.set(newData));
      navigate("/emergency-contacts", { replace: true });
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
