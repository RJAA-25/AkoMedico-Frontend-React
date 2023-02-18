import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/doctors";
import { modalActions } from "../../../store/modal";
import DoctorForm from "../../../components/form/DoctorForm";

const DoctorInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctorId } = useParams();
  const doctorsData = useSelector((state) => state.doctor.data);
  const selected = doctorsData.find((doc) => doc.id === Number(doctorId));

  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Doctor",
    body: "Remove doctor this doctor from your list?",
    action: () =>
      handleDelete({
        dispatch,
        navigate,
        data: doctorsData,
        id: selected.id,
      }),
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <div className="flex gap-3">
        {readOnly && (
          <>
            <Link to="/doctors" className="btn grow">
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
      {!readOnly && (
        <div className="divider font-bold text-xl sm:text-2xl">
          Update Doctor
        </div>
      )}
      <DoctorForm
        setup={selected}
        data={doctorsData}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleSubmit={handleUpdate}
      />
    </div>
  );
};

export default DoctorInfo;
