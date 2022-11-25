import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ContactsList = ({ contacts }) => {
	return (
		<>
			{contacts.map((contact) => (
				<Link key={generateKey()} to={`/emergency-contacts/${contact.id}`}>
					<div>
						<p>{contact.full_name}</p>
					</div>
				</Link>
			))}
		</>
	);
};

export default ContactsList;
