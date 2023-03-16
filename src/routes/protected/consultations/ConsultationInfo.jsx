import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { consultationActions } from "../../../store/consultation";
import { modalActions } from "../../../store/modal";
import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/consultations";
import ConsultationForm from "../../../components/form/ConsultationForm";
import Prescriptions from "../../../components/general/Prescriptions";
import Results from "../../../components/general/Results";

const ConsultationInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { consultationUid } = useParams();
  const consultationsData = useSelector((state) => state.consultation.data);
  const selected = consultationsData.find(
    (consult) => consult.uid === consultationUid
  );

  const [active, setActive] = useState("prescription");
  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Consultation",
    body: "Remove consultation from your list?",
    action: () =>
      handleDelete({
        dispatch,
        navigate,
        data: consultationsData,
        uid: selected.uid,
      }),
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <div className="flex gap-3">
        {readOnly && (
          <>
            <button
              className="btn btn-accent grow"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <label
              htmlFor="confirm-modal"
              onClick={() => dispatch(modalActions.set(modal))}
              className="grow btn btn-error"
            >
              Delete
            </label>
          </>
        )}
        <button
          className={`btn grow ${readOnly ? "btn-neutral" : "btn-error"}`}
          onClick={() => setReadOnly((state) => !state)}
        >
          {readOnly ? "Update" : "Cancel"}
        </button>
      </div>
      <div className="divider font-bold text-xl sm:text-2xl">
        {readOnly ? "Consultation Details" : "Update Consultation"}
      </div>
      <ConsultationForm
        setup={selected}
        data={consultationsData}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleSubmit={handleUpdate}
      />

      {readOnly && (
        <>
          <div className="tabs flex">
            <button
              className={`flex-1 tab tab-bordered transition ${
                active === "prescription" && "tab-active"
              }`}
              onClick={() => setActive("prescription")}
            >
              Prescriptions
            </button>
            <button
              className={`flex-1 tab tab-bordered transition ${
                active === "result" && "tab-active"
              }`}
              onClick={() => setActive("result")}
            >
              Results
            </button>
          </div>

          {active === "prescription" && (
            <Prescriptions
              selected={selected}
              issue="consultation"
              storeAction={consultationActions}
            />
          )}

          {active === "result" && (
            <Results
              selected={selected}
              issue="consultation"
              storeAction={consultationActions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ConsultationInfo;
