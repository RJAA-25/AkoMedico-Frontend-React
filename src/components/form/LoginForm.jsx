import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";
import { profileActions } from "../../store/profile";

import { loginUser } from "../../api/session";
import { getFormData } from "../../helpers/utilities";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);
    const formData = getFormData("#session");
    const res = await loginUser(formData);
    setLoading(false);

    switch (res.status) {
      case 200:
        const { message, user, profile } = res;
        toast.success(message);
        dispatch(authActions.login());
        dispatch(userActions.set(user));
        dispatch(profileActions.set(profile));
        !user.email_confirmed
          ? navigate("/confirmation")
          : !profile
          ? navigate("/get-started")
          : navigate("/overview");
        break;

      case 401:
        toast.error(res.error);
        setError(res.error);
        break;

      default:
        toast.error(res.message);
    }
  };

  return (
    <form
      id="session"
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-lg gap-5 p-5 rounded-lg bg-base-100 shadow-lg backdrop-blur"
    >
      <h1 className="font-bold text-xl">Login</h1>
      <EmailInput name="session[email]" keyword="email" />
      <PasswordInput name="session[password]" keyword="password" />
      {error && <p className="text-error text-sm">{error}</p>}

      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="link hover:text-primary">
          Register
        </Link>
      </p>

      <button
        type="Submit"
        className={`btn btn-neutral ${loading ? "loading" : ""}`}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
