import { useState } from "react";
import { useSelector } from "react-redux";

import { handleCreate } from "../../../utilities/eventHandlers/doctors";

import DoctorsList from "../../../components/list/DoctorsList";
import DoctorForm from "../../../components/form/DoctorForm";

const DoctorsIndex = () => {
  const doctorsData = useSelector((state) => state.doctor.data);
  const doctors = [...doctorsData].sort((a, b) => {
    if (a.last_name < b.last_name) return -1;
    if (a.last_name > b.last_name) return 1;
    return 0;
  });

  const [create, setCreate] = useState(false);
  const setup = {
    first_name: "",
    last_name: "",
    specialty: "",
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <button
        className={`btn ${create ? "btn-error" : "btn-neutral"}`}
        onClick={() => setCreate((state) => !state)}
      >
        {create ? "Cancel" : "Add Doctor"}
      </button>
      {create ? (
        <>
          <div className="divider font-bold text-xl sm:text-2xl">
            Add Doctor
          </div>
          <DoctorForm
            setup={setup}
            data={doctorsData}
            handleSubmit={handleCreate}
          />
        </>
      ) : (
        <DoctorsList data={doctors} />
      )}
    </div>
  );
};

export default DoctorsIndex;
