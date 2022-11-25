import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const AdmissionsList = ({ admissions }) => {
	return (
		<>
			{admissions.map((admission) => (
				<Link key={generateKey()} to={`/admissions/${admission.uid}`}>
					<div>
						<p>{admission.diagnosis}</p>
						<p>{`${admission.start_date} - ${admission.end_date}`}</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default AdmissionsList;
