import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  checkAge,
  checkContact,
  checkNotEmpty,
  checkNumber,
} from "../../helpers/validations";
import { countries } from "../../utilities/dataLists/countries";
import { civilStatus } from "../../utilities/dataLists/civilStatus";
import { sex } from "../../utilities/dataLists/sex";
import { bloodTypes } from "../../utilities/dataLists/bloodTypes";
import DateInput from "../input/DateInput";
import TextInput from "../input/TextInput";
import NumberInput from "../input/NumberInput";
import Select from "../input/Select";

const ProfileForm = (props) => {
  const {
    initials = "",
    setup,
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
      id="profile"
      onSubmit={(e) =>
        handleSubmit(e, {
          dispatch,
          navigate,
          setLoading,
          setReadOnly,
          setError,
        })
      }
      className="mx-auto w-full max-w-3xl grid sm:grid-cols-2 gap-5"
    >
      {readOnly ? (
        <div className="sm:col-span-2 w-48 sm:w-60 mx-auto aspect-square rounded-full overflow-clip grid border-8 border-amber-500 place-items-center bg-primary">
          {!setup.image_url ? (
            <span className="font-black text-7xl sm:text-8xl text-white">
              {initials}
            </span>
          ) : (
            <img src={state.image_url} alt="" className="h-full object-cover" />
          )}
        </div>
      ) : (
        <div className="form-control sm:col-span-2">
          <label className="label">
            <span className="label-text">Profile Picture</span>
          </label>
          <input
            type="file"
            name="profile[image_url]"
            accept="image/*"
            className="file-input w-full input-bordered"
          />
        </div>
      )}

      <DateInput
        name="profile[birth_date]"
        title="Birthdate"
        validate={checkAge}
        keyword="birth_date"
        readOnly={readOnly}
        limit={{ min: null, max: null }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[civil_status]"
        title="Civil Status"
        keyword="civil_status"
        readOnly={readOnly}
        placeholder="Select Civil Status"
        options={{
          list: civilStatus,
          value: "value",
          output: (item) => item.value,
        }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="profile[address]"
        title="Address"
        layout="sm:col-span-2"
        validate={checkNotEmpty}
        keyword="address"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[nationality]"
        title="Nationality"
        keyword="nationality"
        readOnly={readOnly}
        placeholder="Select Nationality"
        options={{
          list: countries,
          value: "nationality",
          output: (item) => item.nationality,
        }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <TextInput
        name="profile[contact_number]"
        title="Contact Number"
        validate={checkContact}
        keyword="contact_number"
        readOnly={readOnly}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[sex]"
        title="Sex"
        keyword="sex"
        readOnly={readOnly}
        placeholder="Select Sex"
        options={{ list: sex, value: "value", output: (item) => item.value }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[blood_type]"
        title="Blood Type"
        keyword="blood_type"
        readOnly={readOnly}
        placeholder="Select Blood Type"
        options={{
          list: bloodTypes,
          value: "value",
          output: (item) => item.value,
        }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <NumberInput
        name="profile[height]"
        title="Height"
        validate={checkNumber}
        keyword="height"
        readOnly={readOnly}
        limit={{ min: 0, max: 5, step: 0.01, unit: "m" }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <NumberInput
        name="profile[weight]"
        title="Weight"
        validate={checkNumber}
        keyword="weight"
        readOnly={readOnly}
        limit={{ min: 0, max: 500, step: 0.1, unit: "kg" }}
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

export default ProfileForm;
