import { useState } from "react";
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
import { handleSubmit } from "../../utilities/eventHandlers/getStarted";

import DateInput from "../input/DateInput";
import TextInput from "../input/TextInput";
import NumberInput from "../input/NumberInput";
import Select from "../input/Select";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    birth_date: "",
    address: "",
    nationality: "",
    civil_status: "",
    contact_number: "",
    height: "",
    weight: "",
    sex: "",
    blood_type: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const formValid = Object.values(state).includes("") ? false : true;

  return (
    <form
      id="profile"
      onSubmit={(e) => handleSubmit(e, { dispatch, navigate, setLoading })}
      className="mx-auto w-full max-w-3xl border border-slate-500 grid sm:grid-cols-2 gap-5 p-5"
    >
      <h1 className="font-bold text-xl sm:col-span-2">Profile</h1>
      <DateInput
        name="profile[birth_date]"
        title="Birthdate"
        validate={checkAge}
        keyword="birth_date"
        limit={{ min: null, max: null }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[civil_status]"
        title="Civil Status"
        keyword="civil_status"
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
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[nationality]"
        title="Nationality"
        keyword="nationality"
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
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[sex]"
        title="Sex"
        keyword="sex"
        placeholder="Select Sex"
        options={{ list: sex, value: "value", output: (item) => item.value }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <Select
        name="profile[blood_type]"
        title="Blood Type"
        keyword="blood_type"
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
        limit={{ min: 0, max: 5, step: 0.01, unit: "m" }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <NumberInput
        name="profile[weight]"
        title="Weight"
        validate={checkNumber}
        keyword="weight"
        limit={{ min: 0, max: 500, step: 0.1, unit: "kg" }}
        state={{ state, setState }}
        error={{ error, setError }}
      />
      <button
        type="Submit"
        disabled={!formValid}
        className={`btn btn-primary sm:col-span-2 ${loading ? "loading" : ""}`}
      >
        Submit
      </button>
    </form>
  );
};

export default ProfileForm;
