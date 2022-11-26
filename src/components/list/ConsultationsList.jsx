import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ConsultationsList = ({ consultations }) => {
	return (
		<div className="mt-5 px-5">
			{consultations.map((consultation) => (
				<Link
					className="text-decoration-none text-dark"
					key={generateKey()}
					to={`/consultations/${consultation.uid}`}>
					<div className="d-flex px-5 py-3 my-3 justify-content-between align-items-center border rounded-pill">
						<p className="fw-semibold">{consultation.diagnosis}</p>
						<p>{consultation.schedule}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ConsultationsList;
