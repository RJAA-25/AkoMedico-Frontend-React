import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { generateKey } from "../../helpers/utilities";
import { checkDate, checkNotEmpty } from "../../helpers/validations";
import DateInput from "../input/DateInput";
import Select from "../input/Select";
import Textarea from "../input/Textarea";
import TextInput from "../input/TextInput";

const ConsultationForm = (props) => {
  const {
    setup,
    data,
    readOnly = false,
    setReadOnly = null,
    handleSubmit,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctorsData = useSelector((state) => state.doctor.data);
  const doctorsList = [...doctorsData].sort((a, b) => {
    if (a.last_name < b.last_name) return -1;
    if (a.last_name > b.last_name) return 1;
    return 0;
  });
  const selected = doctorsList.filter((doc) =>
    setup["doctor_ids"].includes(doc.id)
  );

  const [state, setState] = useState(setup);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { diagnosis, health_facility, schedule, doctor_ids } = state;
  const required = [diagnosis, health_facility, schedule, doctor_ids];

  const formValid = required.includes("") ? false : true;

  useEffect(() => {
    if (readOnly) setState(setup);
  }, [readOnly]);

  return (
    <form
      id="consultation"
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
        name="consultation[diagnosis]"
        title="Chief Complaint"
        validate={checkNotEmpty}
        keyword="diagnosis"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />

      <DateInput
        name="consultation[schedule]"
        title="Date of Appointment"
        validate={checkDate}
        keyword="schedule"
        readOnly={readOnly}
        limit={{ min: null, max: new Date() }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="consultation[health_facility]"
        title="Health Facility"
        layout="sm:col-span-2"
        validate={checkNotEmpty}
        keyword="health_facility"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      {readOnly ? (
        <div className="form-control sm:col-span-2">
          <label className="label">
            <span className="label-text">
              Doctors ({setup["doctor_ids"].length})
            </span>
          </label>
          <ul className="space-y-5">
            {selected.map((doctor) => (
              <li key={generateKey()}>
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="block border p-5 shadow rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-baseline">
                    <p>
                      <span className="font-bold">{doctor.last_name}</span>,{" "}
                      {doctor.first_name}
                    </p>
                    <span className="uppercase text-xs tracking-wide">
                      {doctor.specialty}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Select
          name="consultation[doctor_ids][]"
          title="Doctors"
          layout="sm:col-span-2"
          multiple={false}
          placeholder="Select a doctor"
          keyword="doctor_ids"
          readOnly={readOnly}
          options={{
            list: doctorsList,
            value: "id",
            output: (item) => `${item.last_name}, ${item.first_name}`,
          }}
          state={{ state, setState }}
          error={{ error, setError }}
        />
      )}
      <Textarea
        name="consultation[notes]"
        title="Notes"
        layout="sm:col-span-2"
        keyword="notes"
        readOnly={readOnly}
        state={{ state, setState }}
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

export default ConsultationForm;
