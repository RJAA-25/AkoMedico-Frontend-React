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
		<form id="emergency_contact" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="emergency_contact[full_name]" className="form-label fw-semibold">
					Full Name
				</label>
				<input
					type="text"
					id="emergency_contact[full_name]"
					name="emergency_contact[full_name]"
					readOnly={readOnly}
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="form-control"
				/>
				{error?.full_name && <FormError message={error.full_name} keyword="Full name" />}
			</div>

			<div className="my-3">
				<label htmlFor="emergency_contact[relationship]" className="form-label fw-semibold">
					Relationship
				</label>
				<input
					type="text"
					id="emergency_contact[relationship]"
					name="emergency_contact[relationship]"
					readOnly={readOnly}
					value={relationship}
					onChange={(e) => setRelationship(e.target.value)}
					className="form-control"
				/>
				{error?.relationship && (
					<FormError message={error.relationship} keyword="Relationship" />
				)}
			</div>

			<div className="my-3">
				<label
					htmlFor="emergency_contact[contact_number]"
					className="form-label fw-semibold">
					Contact Number
				</label>
				<input
					type="text"
					id="emergency_contact[contact_number]"
					name="emergency_contact[contact_number]"
					readOnly={readOnly}
					value={contactNumber}
					onChange={(e) => setContactNumber(e.target.value)}
					className="form-control"
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
				<div className="my-5 d-flex flex-column justify-content-center align-items-center">
					<button type="submit" className="btn btn-warning rounded-pill px-5 ">
						Submit
					</button>
					{update && (
						<button
							type="button"
							className="mt-5 btn btn-light rounded-pill px-5"
							onClick={handleCancel}>
							Cancel
						</button>
					)}
				</div>
			)}
		</form>
	);
};

export default ContactForm;
