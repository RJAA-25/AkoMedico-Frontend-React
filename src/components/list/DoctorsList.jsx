import { Link } from "react-router-dom";
import { generateKey } from "../../helpers/utilities";

const DoctorsList = (props) => {
  const { data } = props;

  return (
    <>
      <div className="divider">Doctors ({data.length})</div>

      {data.length === 0 && (
        <div className="border text-center rounded-lg p-10">
          <p>No doctors added</p>
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((doctor) => (
            <li key={generateKey()}>
              <Link
                to={`/doctors/${doctor.uid}`}
                className="block p-5 border border-stone-400 rounded-lg shadow-lg hover:bg-secondary hover:border-transparent transition hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-baseline">
                  <p>
                    <span className="font-bold">{doctor.last_name}</span>,{" "}
                    {doctor.first_name}
                  </p>
                  <span className="uppercase text-xs tracking-wide">
                    {doctor.specialty}
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

export default DoctorsList;
