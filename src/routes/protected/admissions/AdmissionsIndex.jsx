import { useState } from "react";
import { useSelector } from "react-redux";

import { handleCreate } from "../../../utilities/eventHandlers/admissions";

import AdmissionForm from "../../../components/form/AdmissionForm";
import AdmissionsList from "../../../components/list/AdmissionsList";

const AdmissionsIndex = () => {
  const admissionsData = useSelector((state) => state.admission.data);
  const admissions = [...admissionsData].sort((a, b) => {
    let dateA = new Date(a.start_date);
    let dateB = new Date(b.start_date);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  const [create, setCreate] = useState(false);
  const setup = {
    diagnosis: "",
    health_facility: "",
    start_date: "",
    end_date: "",
    notes: "",
    doctor_ids: [],
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <button
        className={`btn ${create ? "btn-error" : "btn-neutral"}`}
        onClick={() => setCreate((state) => !state)}
      >
        {create ? "Cancel" : "Add Admission"}
      </button>
      {create ? (
        <>
          <div className="divider font-bold text-xl sm:text-2xl">
            Add Admission
          </div>
          <AdmissionForm
            setup={setup}
            data={admissionsData}
            handleSubmit={handleCreate}
          />
        </>
      ) : (
        <AdmissionsList data={admissions} />
      )}
    </div>
  );
};

export default AdmissionsIndex;
