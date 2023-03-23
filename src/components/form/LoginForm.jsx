import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSubmit } from "../../utilities/eventHandlers/session";
import { useDispatch } from "react-redux";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      id="session"
      onSubmit={(e) =>
        handleSubmit(e, { navigate, dispatch, setLoading, setError })
      }
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
