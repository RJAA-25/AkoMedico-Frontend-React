import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ConditionsList = ({ conditions }) => {
	return (
		<div className="mt-5 px-5">
			{conditions.map((condition) => (
				<Link
					className="text-decoration-none text-dark"
					key={generateKey()}
					to={`/existing-conditions/${condition.id}`}>
					<div className="d-flex px-5 py-3 my-3 justify-content-between align-items-center border rounded-pill">
						<p className="fw-semibold">{condition.diagnosis}</p>
						<p>
							{condition.start_date}{' '}
							{condition.end_date ? `- ${condition.end_date}` : ''}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ConditionsList;
