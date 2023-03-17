import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkNotEmpty } from "../../helpers/validations";
import TextInput from "../input/TextInput";

const DoctorForm = (props) => {
  const {
    setup,
    data,
    readOnly = false,
    setReadOnly = null,
    handleSubmit,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState(setup);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const formValid = Object.values(state).includes("") ? false : true;

  useEffect(() => {
    if (readOnly) setState(setup);
  }, [readOnly]);

  return (
    <form
      id="doctor"
      onSubmit={(e) =>
        handleSubmit(e, {
          dispatch,
          navigate,
          setLoading,
          setError,
          setReadOnly,
          data,
          uid: setup.uid,
        })
      }
      className="grid sm:grid-cols-2 gap-5"
    >
      <TextInput
        name="doctor[first_name]"
        title="First Name"
        validate={checkNotEmpty}
        keyword="first_name"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="doctor[last_name]"
        title="Last Name"
        validate={checkNotEmpty}
        keyword="last_name"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="doctor[specialty]"
        title="Specialty"
        layout="sm:col-span-2"
        validate={checkNotEmpty}
        readOnly={readOnly}
        keyword="specialty"
        state={{ state, setState }}
        error={{ error, setError }}
      />
      {!readOnly && (
        <button
          type="Submit"
          disabled={!formValid}
          className={`btn btn-neutral sm:col-span-2 ${
            loading ? "loading" : ""
          }`}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default DoctorForm;
