import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPills, faFlaskVial } from "@fortawesome/free-solid-svg-icons";

import { formatDate, generateKey } from "../../helpers/utilities";

const ConsultationsList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="divider">Consultations ({data.length})</div>

      {data.length === 0 && (
        <div className="border text-center rounded-lg p-10">
          <p>No consultations recorded</p>
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((consult) => (
            <li key={generateKey()}>
              <Link
                to={`/consultations/${consult.uid}`}
                className="block border p-5 shadow rounded-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <p>
                    <span className="font-bold">{consult.diagnosis}</span>
                  </p>
                  <p>{formatDate(consult.schedule, "exact")}</p>
                </div>
                <span className="text-sm">{consult.health_facility}</span>
                <div className="flex gap-3 mt-3">
                  {consult.prescriptions.length > 0 && (
                    <div className="badge badge-outline gap-2">
                      {consult.prescriptions.length}
                      <Icon icon={faPills} />
                    </div>
                  )}
                  {consult.results.length > 0 && (
                    <div className="badge badge-outline gap-2">
                      {consult.results.length}
                      <Icon icon={faFlaskVial} />
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ConsultationsList;
