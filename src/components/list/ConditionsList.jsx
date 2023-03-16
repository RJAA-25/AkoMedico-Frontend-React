import { Link } from "react-router-dom";
import { formatDate, generateKey } from "../../helpers/utilities";

const ConditionsList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="divider">Existing Conditions({data.length})</div>

      {data.length === 0 && (
        <div className="border text-center rounded-lg p-10">
          <p>No existing condition recorded</p>
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((condition) => (
            <li key={generateKey()}>
              <Link
                to={`/existing-conditions/${condition.uid}`}
                className="block p-5 border border-stone-400 rounded-lg shadow-lg hover:bg-secondary hover:border-transparent transition hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <p>
                    <span className="font-bold">{condition.diagnosis}</span>
                  </p>
                  <span>
                    {" "}
                    {condition.end_date
                      ? `${formatDate(
                          condition.start_date,
                          "estimate"
                        )} - ${formatDate(condition.end_date, "estimate")}`
                      : `Since ${formatDate(condition.start_date, "estimate")}`}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ConditionsList;
