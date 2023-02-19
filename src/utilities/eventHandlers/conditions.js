import { toast } from "react-hot-toast";

import { initAccess, initConditions } from "../../api/initial";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";
import { conditionActions } from "../../store/condition";
import { forceLogout } from "../functions/global";
import { getFormData } from "../../helpers/utilities";
import {
  createCondition,
  destroyCondition,
  updateCondition,
} from "../../api/conditions";

export const fetchConditions = async ({
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
        const { conditions } = await initConditions();
        setPageLoading(false);
        dispatch(conditionActions.set(conditions));
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
  const formData = getFormData("#condition");
  const res = await createCondition(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, condition } = res;
      toast.success(message);
      dispatch(conditionActions.set([...data, condition]));
      navigate(`/existing-conditions/${condition.id}`);
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
  { dispatch, navigate, setLoading, setError, setReadOnly, data, id }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#condition");
  const res = await updateCondition(formData, id);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, condition } = res;
      toast.success(message);
      setReadOnly((state) => !state);
      const index = data.map((condition) => condition.id).indexOf(id);
      const newData = [...data];
      newData.splice(index, 1, condition);
      dispatch(conditionActions.set(newData));
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

export const handleDelete = async ({ dispatch, navigate, data, id }) => {
  toast.dismiss();
  const res = await destroyCondition(id);

  switch (res.status) {
    case 200:
      const { message } = res;
      toast.success(message);
      const index = data.map((condition) => condition.id).indexOf(id);

      const newData = [...data];
      newData.splice(index, 1);
      dispatch(conditionActions.set(newData));
      navigate("/existing-conditions", { replace: true });
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
