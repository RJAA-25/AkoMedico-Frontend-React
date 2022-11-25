import { NavLink } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ContactsList = ({ contacts }) => {
	return (
		<>
			{contacts.map((contact) => (
				<NavLink key={generateKey()} to={`/emergency-contacts/${contact.id}`}>
					<div>
						<p>{contact.full_name}</p>
					</div>
				</NavLink>
			))}
		</>
	);
};

export default ContactsList;
