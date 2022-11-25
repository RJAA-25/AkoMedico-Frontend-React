import { useState } from 'react';

import FormError from '../error/FormError';

const ContactForm = ({
	contact = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const [fullName, setFullName] = useState(contact.full_name || '');
	const [relationship, setRelationship] = useState(contact.relationship || '');
	const [contactNumber, setContactNumber] = useState(contact.contact_number || '');

	const handleCancel = () => {
		setFullName(contact.full_name);
		setRelationship(contact.relationship);
		setContactNumber(contact.contact_number);
		setError({});
		setReadOnly(true);
	};
	return (
		<form id="emergency_contact" onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="emergency_contact[full_name]"
					readOnly={readOnly}
					value={fullName}
					placeholder="Full Name"
					onChange={(e) => setFullName(e.target.value)}
				/>
				{error?.full_name && <FormError message={error.full_name} keyword="Full name" />}
			</div>

			<div>
				<input
					type="text"
					name="emergency_contact[relationship]"
					readOnly={readOnly}
					value={relationship}
					placeholder="Relationship"
					onChange={(e) => setRelationship(e.target.value)}
				/>
				{error?.relationship && (
					<FormError message={error.relationship} keyword="Relationship" />
				)}
			</div>

			<div>
				<input
					type="text"
					name="emergency_contact[contact_number]"
					readOnly={readOnly}
					value={contactNumber}
					placeholder="Contact Number"
					onChange={(e) => setContactNumber(e.target.value)}
				/>
				{error?.contact_number && (
					<FormError
						message={error.contact_number}
						keyword="Contact number"
						custom={true}
					/>
				)}
			</div>

			{!readOnly && (
				<div>
					<button type="submit">Submit</button>
					{update && (
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					)}
				</div>
			)}
		</form>
	);
};

export default ContactForm;
