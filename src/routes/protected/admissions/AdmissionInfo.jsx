import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { modalActions } from "../../../store/modal";
import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/admissions";

import AdmissionForm from "../../../components/form/AdmissionForm";

const AdmissionInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admissionUid } = useParams();
  const admissionsData = useSelector((state) => state.admission.data);
  const selected = admissionsData.find((admit) => admit.uid === admissionUid);

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
            <Link to="/admissions" className="btn grow">
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
        {readOnly ? "Admission Details" : "Update Admission"}
      </div>
      <AdmissionForm
        setup={selected}
        data={admissionsData}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleSubmit={handleUpdate}
      />
    </div>
  );
};

export default AdmissionInfo;
