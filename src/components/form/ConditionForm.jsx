import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkDate, checkNotEmpty } from "../../helpers/validations";
import DateInput from "../input/DateInput";
import TextInput from "../input/TextInput";

const ConditionForm = (props) => {
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

  const { diagnosis, start_date } = state;
  const required = [diagnosis, start_date];

  const formValid = required.includes("") ? false : true;

  useEffect(() => {
    if (readOnly) setState(setup);
  }, [readOnly]);

  return (
    <form
      id="condition"
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
        name="condition[diagnosis]"
        title="Diagnosis"
        layout="sm:col-span-2"
        validate={checkNotEmpty}
        keyword="diagnosis"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <DateInput
        name="condition[start_date]"
        title="Start of Diagnosis"
        validate={checkDate}
        keyword="start_date"
        readOnly={readOnly}
        limit={{ min: null, max: new Date() }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <DateInput
        name="condition[end_date]"
        title="End of Diagnosis"
        validate={checkDate}
        keyword="end_date"
        readOnly={readOnly}
        limit={{ min: state.start_date || null, max: new Date() }}
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

export default ConditionForm;
