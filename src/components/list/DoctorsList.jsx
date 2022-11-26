import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const DoctorsList = ({ doctors }) => {
	return (
		<div className="mt-5 px-5">
			{doctors.map((doctor) => (
				<Link
					className="text-decoration-none text-dark"
					key={generateKey()}
					to={`/doctors/${doctor.id}`}>
					<div className="d-flex px-5 py-3 my-3 justify-content-between align-items-center border rounded-pill">
						<p className="fw-semibold">{`${doctor.last_name}, ${doctor.first_name}`}</p>
						<p>{doctor.specialty}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default DoctorsList;
