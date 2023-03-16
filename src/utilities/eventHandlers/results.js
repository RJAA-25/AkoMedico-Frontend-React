import { toast } from "react-hot-toast";
import { createResult, updateResult } from "../../api/results";
import { getFormData } from "../../helpers/utilities";
import { forceLogout } from "../functions/global";

export const handleUpload = async (
  e,
  { dispatch, navigate, storeAction, setLoading, setStatus, source, data }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#result");
  const res = await createResult(formData, data.uid);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, results } = res;
      toast.success(message);
      data.results = results;
      const index = source.map((obj) => obj.uid === data.uid).indexOf(data.uid);
      const newData = [...source];
      newData.splice(index, 1, data);
      dispatch(storeAction.set(newData));
      setStatus("base");
      break;

    case 400:
      toast(res.error);
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    case 422:
      toast.error(res.error);
      break;

    default:
      toast.error(res.message);
  }
};

export const handleRemove = async (
  e,
  { dispatch, navigate, storeAction, setStatus, source, data }
) => {
  e.preventDefault();
  toast.dismiss();
  const formData = getFormData("#result");
  const res = await updateResult(formData, data.uid);

  switch (res.status) {
    case 200:
      const { message, results } = res;
      toast.success(message);
      data.results = results;
      const index = source.map((obj) => obj.uid === data.uid).indexOf(data.uid);
      const newData = [...source];
      newData.splice(index, 1, data);
      dispatch(storeAction.set(newData));
      setStatus("base");
      break;

    case 400:
      toast(res.error);
      break;

    case 401:
      toast.error(res.error);
      forceLogout(dispatch, navigate);
      break;

    case 422:
      toast.error(res.error);
      break;

    default:
      toast.error(res.message);
  }
};
