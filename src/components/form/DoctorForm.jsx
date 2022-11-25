import { useState } from 'react';

import FormError from '../error/FormError';

const DoctorForm = ({
	doctor = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const [firstName, setFirstName] = useState(doctor.first_name || '');
	const [lastName, setLastName] = useState(doctor.last_name || '');
	const [specialty, setSpecialty] = useState(doctor.specialty || '');

	const handleCancel = () => {
		setFirstName(doctor.first_name);
		setLastName(doctor.last_name);
		setSpecialty(doctor.specialty);
		setError({});
		setReadOnly(true);
	};
	return (
		<form id="doctor" onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="doctor[first_name]"
					readOnly={readOnly}
					value={firstName}
					placeholder="First Name"
					onChange={(e) => setFirstName(e.target.value)}
				/>
				{error?.first_name && <FormError message={error.first_name} keyword="First name" />}
			</div>

			<div>
				<input
					type="text"
					name="doctor[last_name]"
					readOnly={readOnly}
					value={lastName}
					placeholder="Last Name"
					onChange={(e) => setLastName(e.target.value)}
				/>
				{error?.last_name && <FormError message={error.last_name} keyword="Last name" />}
			</div>

			<div>
				<input
					type="text"
					name="doctor[specialty]"
					readOnly={readOnly}
					value={specialty}
					placeholder="Specialty"
					onChange={(e) => setSpecialty(e.target.value)}
				/>
				{error?.specialty && <FormError message={error.specialty} keyword="Specialty" />}
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

export default DoctorForm;
