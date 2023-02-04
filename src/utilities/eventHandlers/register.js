import { toast } from "react-hot-toast";

import { registerUser } from "../../api/register";
import { getFormData } from "../../helpers/utilities";

export const handleSubmit = async (e, { navigate, setLoading }) => {
  e.preventDefault();
  toast.dismiss();
  setLoading(true);
  const formData = getFormData("#register");
  const res = await registerUser(formData);
  setLoading(false);

  switch (res.status) {
    case 201:
      navigate("/");
      toast.success(res.message);
      break;

    case 422:
      setError(res.errors);
      break;

    default:
      toast.error(res.message);
  }
};
