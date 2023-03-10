import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { modalActions } from "../../../store/modal";
import {
  handleDelete,
  handleUpdate,
} from "../../../utilities/eventHandlers/conditions";

import ConditionForm from "../../../components/form/ConditionForm";

const ConditionInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { conditionUid } = useParams();
  const conditionsData = useSelector((state) => state.condition.data);
  const selected = conditionsData.find(
    (condition) => condition.uid === conditionUid
  );

  const [readOnly, setReadOnly] = useState(true);
  const modal = {
    title: "Delete Existing Condition",
    body: "Remove condition from your list?",
    action: () =>
      handleDelete({
        dispatch,
        navigate,
        data: conditionsData,
        uid: selected.uid,
      }),
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <div className="flex gap-3">
        {readOnly && (
          <>
            <Link to="/existing-conditions" className="btn grow">
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
        {readOnly ? "Condition Details" : "Update Condition"}
      </div>
      <ConditionForm
        setup={selected}
        data={conditionsData}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        handleSubmit={handleUpdate}
      />
    </div>
  );
};

export default ConditionInfo;
