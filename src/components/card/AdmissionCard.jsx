import { Link } from "react-router-dom";
import { formatDate } from "../../helpers/utilities";

const AdmissionCard = (props) => {
  const { data } = props;
  const admissions = [...data].sort((a, b) => {
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
            Latest Admission
          </p>

          <Link
            to={`/admissions/${admissions[0].uid}`}
            className="block border rounded-lg"
          >
            <div className="p-5 sm:p-10">
              <p className="my-2 font-bold text-xl sm:text-2xl">
                {admissions[0].diagnosis}
              </p>
              <p className="my-2">{admissions[0].health_facility}</p>
              <p>
                {formatDate(admissions[0].start_date, "exact")} -{" "}
                {formatDate(admissions[0].end_date, "exact")}
              </p>
            </div>
          </Link>
        </section>
      ) : null}
    </>
  );
};

export default AdmissionCard;
