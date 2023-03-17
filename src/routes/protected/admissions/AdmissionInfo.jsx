import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { admissionActions } from "../../../store/admission";
import { modalActions } from "../../../store/modal";
import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/admissions";
import AdmissionForm from "../../../components/form/AdmissionForm";
import Prescriptions from "../../../components/general/Prescriptions";
import Results from "../../../components/general/Results";
import Abstracts from "../../../components/general/Abstracts";

const AdmissionInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admissionUid } = useParams();
  const admissionsData = useSelector((state) => state.admission.data);
  const selected = admissionsData.find((admit) => admit.uid === admissionUid);

  const [active, setActive] = useState("prescription");
  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Admission",
    body: "Remove admission from your list?",
    action: () =>
      handleDelete({
        dispatch,
        navigate,
        data: admissionsData,
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
        {readOnly ? "Admission Details" : "Update Admission"}
      </div>
      <AdmissionForm
        setup={selected}
        data={admissionsData}
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
            <button
              className={`flex-1 tab tab-bordered transition ${
                active === "abstract" && "tab-active"
              }`}
              onClick={() => setActive("abstract")}
            >
              Abstracts
            </button>
          </div>

          {active === "prescription" && (
            <Prescriptions
              selected={selected}
              issue="admission"
              storeAction={admissionActions}
            />
          )}

          {active === "result" && (
            <Results
              selected={selected}
              issue="admission"
              storeAction={admissionActions}
            />
          )}

          {active === "abstract" && (
            <Abstracts
              selected={selected}
              issue="admission"
              storeAction={admissionActions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdmissionInfo;
