import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  checkNotEmpty,
  checkEmail,
  checkPassword,
} from "../../helpers/validations";
import { handleSubmit } from "../../utilities/eventHandlers/register";
import TextInput from "../input/TextInput";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const formValid = Object.values(state).includes("") ? false : true;

  return (
    <form
      id="register"
      onSubmit={(e) => handleSubmit(e, { navigate, setLoading, setError })}
      className="mx-auto max-w-3xl grid sm:grid-cols-2 gap-5 p-5 bg-base-100 rounded-lg shadow-lg"
    >
      <h1 className="font-bold text-xl sm:col-span-2">Register</h1>
      <TextInput
        name="register[first_name]"
        title="First Name"
        layout=""
        validate={checkNotEmpty}
        keyword="first_name"
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="register[last_name]"
        title="Last Name"
        layout=""
        validate={checkNotEmpty}
        keyword="last_name"
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <EmailInput
        name="register[email]"
        layout="sm:col-span-2"
        validate={checkEmail}
        keyword="email"
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <PasswordInput
        name="register[password]"
        layout=""
        validate={checkPassword}
        confirm={true}
        keyword="password"
        state={{ state, setState }}
        error={{ error, setError }}
      />

      <p className="text-sm">
        Already have an account?{" "}
        <Link to="/login" className="link hover:text-primary">
          Login
        </Link>
      </p>

      <button
        type="Submit"
        disabled={!formValid}
        className={`btn btn-neutral sm:col-span-2 ${loading ? "loading" : ""}`}
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
