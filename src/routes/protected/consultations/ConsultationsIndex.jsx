import { useState } from "react";
import { useSelector } from "react-redux";

import ConsultationForm from "../../../components/form/ConsultationForm";
import ConsultationsList from "../../../components/list/ConsultationsList";
import { handleCreate } from "../../../utilities/eventHandlers/consultations";

const ConsultationsIndex = () => {
  const consultationsData = useSelector((state) => state.consultation.data);
  const consultations = [...consultationsData].sort((a, b) => {
    let dateA = new Date(a.schedule);
    let dateB = new Date(b.schedule);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  const [create, setCreate] = useState(false);
  const setup = {
    diagnosis: "",
    health_facility: "",
    schedule: "",
    notes: "",
    doctor_ids: "",
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <button
        className={`btn ${create ? "btn-error" : "btn-neutral"}`}
        onClick={() => setCreate((state) => !state)}
      >
        {create ? "Cancel" : "Add Consultation"}
      </button>
      {create ? (
        <>
          <div className="divider font-bold text-xl sm:text-2xl">
            Add Consultation
          </div>
          <ConsultationForm
            setup={setup}
            data={consultationsData}
            handleSubmit={handleCreate}
          />
        </>
      ) : (
        <ConsultationsList data={consultations} />
      )}
    </div>
  );
};

export default ConsultationsIndex;
