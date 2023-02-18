import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkNotEmpty, checkContact } from "../../helpers/validations";
import TextInput from "../input/TextInput";

const ContactForm = (props) => {
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
      id="emergency_contact"
      onSubmit={(e) =>
        handleSubmit(e, {
          dispatch,
          navigate,
          setLoading,
          setError,
          setReadOnly,
          data,
          id: setup.id,
        })
      }
      className="grid sm:grid-cols-2 gap-5"
    >
      <TextInput
        name="emergency_contact[full_name]"
        title="Full Name"
        validate={checkNotEmpty}
        keyword="full_name"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="emergency_contact[contact_number]"
        title="Contact Number"
        validate={checkContact}
        keyword="contact_number"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="emergency_contact[relationship]"
        title="Relationship"
        validate={checkNotEmpty}
        layout="sm:col-span-2"
        keyword="relationship"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      {!readOnly && (
        <button
          type="Submit"
          disabled={!formValid}
          className={`btn btn-primary sm:col-span-2 ${
            loading ? "loading" : ""
          }`}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default ContactForm;
