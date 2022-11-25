import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { contactActions } from '../../../../store/contact';

import ContactForm from '../../../../components/form/ContactForm';

import { destroyContact, updateContact } from '../../../../api/contact';

const ContactInfo = () => {
	console.log('Passed ContactInfo');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { contactId } = useParams();
	const contacts = useSelector((state) => state.contact.data);
	const contact = contacts.find((doc) => doc.id === Number(contactId));

	const index = contacts.indexOf(contact);
	const copy = [...contacts];

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#emergency_contact');
		const formData = new FormData(form);
		const res = await updateContact(formData, contact.id);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { emergency_contact: updated },
				} = res;
				copy.splice(index, 1, updated);
				dispatch(contactActions.set(copy));
				setError({});
				setReadOnly(true);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const res = await destroyContact(contact.id);
		switch (res.status) {
			case 200:
				copy.splice(index, 1);
				dispatch(contactActions.set(copy));
				console.log('Redirect to Contacts');
				navigate('/contacts', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			{contact && (
				<>
					<button onClick={() => navigate(-1)}>Back</button>
					{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
					<button onClick={handleDelete}>Delete</button>
					<ContactForm
						contact={contact}
						readOnly={readOnly}
						setReadOnly={setReadOnly}
						error={error}
						setError={setError}
						update={true}
						handleSubmit={handleUpdate}
					/>
				</>
			)}
		</div>
	);
};

export default ContactInfo;
