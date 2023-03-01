import { toast } from "react-hot-toast";
import { createAbstract, updateAbstract } from "../../api/abstracts";
import { getFormData } from "../../helpers/utilities";
import { forceLogout } from "../functions/global";

export const handleUpload = async (
  e,
  { dispatch, navigate, storeAction, setLoading, setStatus, source, data }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#abstract");
  const res = await createAbstract(formData, data.uid);
  setLoading(false);

  switch (res.status) {
    case 201:
      const { message, abstracts } = res;
      toast.success(message);
      data.abstracts = abstracts;
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
  { dispatch, navigate, storeAction, setLoading, setStatus, source, data }
) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#abstract");
  const res = await updateAbstract(formData, data.uid);
  setLoading(false);

  switch (res.status) {
    case 200:
      const { message, abstracts } = res;
      toast.success(message);
      data.abstracts = abstracts;
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
