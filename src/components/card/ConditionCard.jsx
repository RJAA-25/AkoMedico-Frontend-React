import { Link } from "react-router-dom";
import { formatDate, generateKey } from "../../helpers/utilities";

const ConditionCard = (props) => {
  const { data } = props;
  const conditions = [...data].sort((a, b) => {
    let dateA = new Date(a.start_date);
    let dateB = new Date(b.start_date);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  return (
    <>
      {data.length > 0 ? (
        <section>
          <p className="p-5 sm:p-10 uppercase tracking-widest text-sm font-bold">
            Existing Conditions
          </p>
          <div className="grid gap-5">
            {conditions.map((condition) => (
              <Link
                to={`/existing-conditions/${condition.uid}`}
                key={generateKey()}
                className="block border rounded-lg"
              >
                <div className="p-5 sm:p-10">
                  <p className="my-2 font-bold text-xl sm:text-2xl">
                    {condition.diagnosis}
                  </p>
                  <span>
                    {condition.end_date
                      ? `${formatDate(
                          condition.start_date,
                          "estimate"
                        )} - ${formatDate(condition.end_date, "estimate")}`
                      : `Since ${formatDate(condition.start_date, "estimate")}`}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ConditionCard;
