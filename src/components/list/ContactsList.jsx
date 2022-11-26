import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

const ContactsList = ({ contacts }) => {
	return (
		<div className="mt-5 px-5">
			{contacts.map((contact) => (
				<Link
					className="text-decoration-none text-dark"
					key={generateKey()}
					to={`/emergency-contacts/${contact.id}`}>
					<div className="d-flex px-5 py-3 my-3 justify-content-between align-items-center border rounded-pill">
						<p className="fw-semibold">{contact.full_name}</p>
						<p>{contact.relationship}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ContactsList;
