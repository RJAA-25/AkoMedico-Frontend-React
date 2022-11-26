import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const AdmissionsList = ({ admissions }) => {
	return (
		<div className="mt-5 px-5">
			{admissions.map((admission) => (
				<Link
					className="text-decoration-none text-dark"
					key={generateKey()}
					to={`/admissions/${admission.uid}`}>
					<div className="d-flex px-5 py-3 my-3 justify-content-between align-items-center border rounded-pill">
						<p className="fw-semibold">{admission.diagnosis}</p>
						<p>{`${admission.start_date} - ${admission.end_date}`}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default AdmissionsList;
