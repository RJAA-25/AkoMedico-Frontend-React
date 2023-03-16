import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faPills,
  faFlaskVial,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, generateKey } from "../../helpers/utilities";

const AdmissionsList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="divider">Admissions ({data.length})</div>

      {data.length === 0 && (
        <div className="border text-center rounded-lg p-10">
          <p>No admissions recorded</p>
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((admit) => (
            <li key={generateKey()}>
              <Link
                to={`/admissions/${admit.uid}`}
                className="block p-5 border border-stone-400 rounded-lg shadow-lg hover:bg-secondary hover:border-transparent transition hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <p>
                    <span className="font-bold">{admit.diagnosis}</span>
                  </p>
                  <p>
                    {formatDate(admit.start_date, "exact")} -{" "}
                    {formatDate(admit.end_date, "exact")}
                  </p>
                </div>
                <span className="text-sm">{admit.health_facility}</span>
                <div className="flex gap-3 mt-3">
                  {admit.prescriptions.length > 0 && (
                    <div className="badge badge-secondary gap-2">
                      {admit.prescriptions.length}
                      <Icon icon={faPills} />
                    </div>
                  )}
                  {admit.results.length > 0 && (
                    <div className="badge badge-secondary gap-2">
                      {admit.results.length}
                      <Icon icon={faFlaskVial} />
                    </div>
                  )}
                  {admit.abstracts.length > 0 && (
                    <div className="badge badge-secondary gap-2">
                      {admit.abstracts.length}
                      <Icon icon={faHeartPulse} />
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

export default AdmissionsList;
