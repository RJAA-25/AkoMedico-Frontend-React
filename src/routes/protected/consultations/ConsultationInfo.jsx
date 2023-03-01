import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConsultationForm from "../../../components/form/ConsultationForm";
import Prescriptions from "../../../components/general/Prescriptions";
import { consultationActions } from "../../../store/consultation";

import { modalActions } from "../../../store/modal";
import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/consultations";

const ConsultationInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { consultationUid } = useParams();
  const consultationsData = useSelector((state) => state.consultation.data);
  const selected = consultationsData.find(
    (consult) => consult.uid === consultationUid
  );
  const prescriptions = selected.prescriptions;
  const results = selected.results;

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
            <Link to="/consultations" className="btn grow">
              Back
            </Link>
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
          className={`btn grow ${readOnly ? "btn-secondary" : "btn-error"}`}
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
          <Prescriptions
            selected={selected}
            issue="consultation"
            storeAction={consultationActions}
          />
        </>
      )}
    </div>
  );
};

export default ConsultationInfo;
