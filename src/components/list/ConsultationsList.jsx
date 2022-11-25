import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ConsultationsList = ({ consultations }) => {
	return (
		<>
			{consultations.map((consultation) => (
				<Link key={generateKey()} to={`/consultations/${consultation.uid}`}>
					<div>
						<p>{consultation.diagnosis}</p>
						<p>{consultation.schedule}</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default ConsultationsList;
