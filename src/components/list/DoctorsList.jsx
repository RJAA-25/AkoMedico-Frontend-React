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
          <span className="text-sm italic block">(for now, right?)</span>
          <span className="text-xs italic">(...right?)</span>
        </div>
      )}

      {data.length > 0 && (
        <ul className="space-y-5">
          {data.map((doctor) => (
            <li key={generateKey()}>
              <Link
                to={`/doctors/${doctor.id}`}
                className="block border p-5 shadow rounded-lg"
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
