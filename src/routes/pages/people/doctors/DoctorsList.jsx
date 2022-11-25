import { NavLink } from 'react-router-dom';
import { generateKey } from '../../../../utilities/keygen';

const DoctorsList = ({ doctors }) => {
	return (
		<>
			{doctors.map((doctor) => (
				<NavLink key={generateKey()} to={`/doctors/${doctor.id}`}>
					<div>
						<p>{`${doctor.last_name}, ${doctor.first_name}`}</p>
						<p>{doctor.specialty}</p>
					</div>
				</NavLink>
			))}
		</>
	);
};

export default DoctorsList;
