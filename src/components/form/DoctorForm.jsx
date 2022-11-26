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
		<form id="doctor" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="doctor[first_name]" className="form-label fw-semibold">
					First Name
				</label>
				<input
					type="text"
					id="doctor[first_name]"
					name="doctor[first_name]"
					readOnly={readOnly}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					className="form-control"
				/>
				{error?.first_name && <FormError message={error.first_name} keyword="First name" />}
			</div>

			<div className="my-3">
				<label htmlFor="doctor[last_name]" className="form-label fw-semibold">
					Last Name
				</label>
				<input
					type="text"
					name="doctor[last_name]"
					readOnly={readOnly}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					className="form-control"
				/>
				{error?.last_name && <FormError message={error.last_name} keyword="Last name" />}
			</div>

			<div className="my-3">
				<label htmlFor="doctor[specialty]" className="form-label fw-semibold">
					Specialty
				</label>
				<input
					type="text"
					name="doctor[specialty]"
					readOnly={readOnly}
					value={specialty}
					onChange={(e) => setSpecialty(e.target.value)}
					className="form-control"
				/>
				{error?.specialty && <FormError message={error.specialty} keyword="Specialty" />}
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

export default DoctorForm;
