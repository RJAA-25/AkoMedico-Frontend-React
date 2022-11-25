import { NavLink } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ConditionsList = ({ conditions }) => {
	return (
		<>
			{conditions.map((condition) => (
				<NavLink key={generateKey()} to={`/existing-conditions/${condition.id}`}>
					<div>
						<p>{condition.diagnosis}</p>
						<p>
							{condition.start_date}{' '}
							{condition.end_date ? `- ${condition.end_date}` : ''}
						</p>
					</div>
				</NavLink>
			))}
		</>
	);
};

export default ConditionsList;
