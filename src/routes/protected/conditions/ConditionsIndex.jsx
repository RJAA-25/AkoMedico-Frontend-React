import { useState } from "react";
import { useSelector } from "react-redux";

import ConditionForm from "../../../components/form/ConditionForm";
import ConditionsList from "../../../components/list/ConditionsList";
import { handleCreate } from "../../../utilities/eventHandlers/conditions";

const ConditionsIndex = () => {
  const conditionsData = useSelector((state) => state.condition.data);
  const conditions = [...conditionsData].sort((a, b) => {
    let dateA = new Date(a.start_date);
    let dateB = new Date(b.start_date);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  const [create, setCreate] = useState(false);
  const setup = {
    diagnosis: "",
    start_date: "",
    end_date: "",
  };

  return (
    <div className="mx-auto w-full max-w-3xl grid gap-5">
      <button
        className={`btn ${create ? "btn-error" : "btn-neutral"}`}
        onClick={() => setCreate((state) => !state)}
      >
        {create ? "Cancel" : "Add Existing Condition"}
      </button>
      {create ? (
        <>
          <div className="divider font-bold text-xl sm:text-2xl">
            Add Existing Condition
          </div>
          <ConditionForm
            setup={setup}
            data={conditionsData}
            handleSubmit={handleCreate}
          />
        </>
      ) : (
        <ConditionsList data={conditions} />
      )}
    </div>
  );
};

export default ConditionsIndex;
