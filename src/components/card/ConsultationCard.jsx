import { Link } from "react-router-dom";
import { formatDate } from "../../helpers/utilities";

const ConsultationCard = (props) => {
  const { data } = props;
  const consultations = [...data].sort((a, b) => {
    let dateA = new Date(a.schedule);
    let dateB = new Date(b.schedule);
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;
    return 0;
  });

  return (
    <>
      {data.length > 0 ? (
        <section>
          <p className="p-5 sm:p-10 uppercase tracking-widest text-sm font-bold">
            Latest Consultation
          </p>

          <Link
            to={`/consultations/${consultations[0].uid}`}
            className="block border border-stone-400 rounded-lg shadow-lg hover:bg-secondary hover:border-transparent transition hover:shadow-xl"
          >
            <div className="p-5 sm:p-10">
              <p className="my-2 font-bold text-xl sm:text-2xl">
                {consultations[0].diagnosis}
              </p>
              <p className="my-2">{consultations[0].health_facility}</p>
              <p>{formatDate(consultations[0].schedule, "exact")}</p>
            </div>
          </Link>
        </section>
      ) : null}
    </>
  );
};

export default ConsultationCard;
