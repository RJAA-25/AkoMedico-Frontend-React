import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const DoctorsList = ({ doctors }) => {
	return (
		<>
			{doctors.map((doctor) => (
				<Link key={generateKey()} to={`/doctors/${doctor.id}`}>
					<div>
						<p>{`${doctor.last_name}, ${doctor.first_name}`}</p>
						<p>{doctor.specialty}</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default DoctorsList;
