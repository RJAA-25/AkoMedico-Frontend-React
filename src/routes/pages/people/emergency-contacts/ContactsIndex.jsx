import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { contactActions } from '../../../../store/contact';

import ContactsList from '../../../../components/list/ContactsList';
import ContactForm from '../../../../components/form/ContactForm';

import { createContact } from '../../../../api/contact';

const ContactsIndex = () => {
	console.log('Passed ContactsIndex');
	const [create, setCreate] = useState(false);
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const contacts = useSelector((state) => state.contact.data);
	const contactState = useSelector((state) => state.contact.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#emergency_contact');
		const formData = new FormData(form);
		const res = await createContact(formData);
		switch (res.status) {
			case 201:
				console.log(res.data.emergency_contact);
				const {
					data: { emergency_contact: contact },
				} = res;
				dispatch(contactActions.set([...contacts, contact]));
				setError({});
				setCreate(false);
				navigate(`/emergency-contacts/${contact.id}`);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div className="flex-grow-1">
			{contactState && (
				<>
					{!create && (
						<>
							<button
								className="btn btn-warning rounded-pill px-5 my-3"
								onClick={() => setCreate(true)}>
								Add
							</button>
							<ContactsList contacts={contacts} />
						</>
					)}
					{create && (
						<>
							<ContactForm
								error={error}
								setError={setError}
								handleSubmit={handleCreate}
							/>
							<button
								onClick={() => {
									setError({});
									setCreate(false);
								}}>
								Cancel
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ContactsIndex;
