import { useState } from 'react';

import FormError from '../error/FormError';

import {
	countries,
	civilStatus as cStatus,
	bloodType as bType,
	sex as s,
} from '../../utilities/selection';

const ProfileForm = ({
	profile = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const [sex, setSex] = useState(profile.sex || '');
	const [height, setHeight] = useState(profile.height || '');
	const [weight, setWeight] = useState(profile.weight || '');
	const [address, setAddress] = useState(profile.address || '');
	const [birthdate, setBirthdate] = useState(profile.birth_date || '');
	const [bloodType, setBloodType] = useState(profile.blood_type || '');
	const [nationality, setNationality] = useState(profile.nationality || '');
	const [civilStatus, setCivilStatus] = useState(profile.civil_status || '');
	const [contactNumber, setContactNumber] = useState(profile.contact_number || '');

	const handleCancel = () => {
		setSex(profile.sex);
		setHeight(profile.height);
		setWeight(profile.weight);
		setAddress(profile.address);
		setBirthdate(profile.birth_date);
		setBloodType(profile.blood_type);
		setNationality(profile.nationality);
		setCivilStatus(profile.civil_status);
		setContactNumber(profile.contact_number);
		setError({});
		setReadOnly(true);
	};

	return (
		<form id="profile" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="profile[birth_date]" className="form-label fw-semibold">
					Birthdate
				</label>
				<input
					type="date"
					id="profile[birth_date"
					name="profile[birth_date]"
					readOnly={readOnly}
					value={birthdate}
					onChange={(e) => setBirthdate(e.target.value)}
					className="form-control"
				/>
				{error?.birth_date && (
					<FormError message={error.birth_date} keyword="Birthdate" custom={true} />
				)}
			</div>

			<div className="my-3">
				<label htmlFor="profile[address]" className="form-label fw-semibold">
					Address
				</label>
				<input
					type="text"
					name="profile[address]"
					readOnly={readOnly}
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					className="form-control"
				/>
				{error?.address && <FormError message={error.address} keyword="Address" />}
			</div>

			<div className="my-3">
				<label htmlFor="profile[nationality]" className="form-label fw-semibold">
					Nationality
				</label>
				<select
					id="profile[nationality]"
					name="profile[nationality]"
					disabled={readOnly}
					value={nationality}
					onChange={(e) => setNationality(e.target.value)}
					className="form-control">
					<option value="">-- Select Nationality --</option>
					{countries.map((country) => (
						<option
							key={country.alpha_2_code.toLowerCase()}
							value={country.nationality}>
							{country.nationality}
						</option>
					))}
				</select>
				{error?.nationality && (
					<FormError message={error.nationality} keyword="Nationality" />
				)}
			</div>

			<div className="my-3">
				<label htmlFor="profile[civil_status]" className="form-label fw-semibold">
					Civil Status
				</label>
				<select
					name="profile[civil_status]"
					disabled={readOnly}
					value={civilStatus}
					onChange={(e) => setCivilStatus(e.target.value)}
					className="form-control">
					<option value="">-- Select Civil Status --</option>
					{cStatus.map((status) => (
						<option key={status.toLowerCase()} value={status}>
							{status}
						</option>
					))}
				</select>
				{error?.civil_status && (
					<FormError message={error.civil_status} keyword="Civil status" />
				)}
			</div>

			<div className="my-3">
				<label htmlFor="profile[contact_number]" className="form-label fw-semibold">
					Contact Number
				</label>
				<input
					id="profile[contact_number]"
					type="text"
					name="profile[contact_number]"
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

			<div className="my-3">
				<label htmlFor="profile[height]" className="form-label fw-semibold">
					Height (m)
				</label>
				<input
					type="number"
					id="profile[height]"
					name="profile[height]"
					readOnly={readOnly}
					value={height}
					onChange={(e) => setHeight(e.target.value)}
					className="form-control"
				/>
				{error?.height && <FormError message={error.height} keyword="Height" />}
			</div>

			<div className="my-3">
				<label htmlFor="profile[weight]" className="form-label fw-semibold">
					Weight (kg)
				</label>
				<input
					type="number"
					id="profile[weight"
					name="profile[weight]"
					readOnly={readOnly}
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
					className="form-control"
				/>
				{error?.weight && <FormError message={error.weight} keyword="Weight" />}
			</div>

			<div className="my-3">
				<label htmlFor="profile[sex]" className="form-label fw-semibold">
					Sex
				</label>
				<select
					name="profile[sex]"
					disabled={readOnly}
					value={sex}
					onChange={(e) => setSex(e.target.value)}
					className="form-control">
					<option value="">-- Select Sex --</option>
					{s.map((sex) => (
						<option key={sex.toLowerCase()} value={sex}>
							{sex}
						</option>
					))}
				</select>
				{error?.sex && <FormError message={error.sex} keyword="Sex" />}
			</div>

			<div className="my-3">
				<label htmlFor="profile[blood_type]" className="form-label fw-semibold">
					Blood Type
				</label>
				<select
					id="profile[blood_type"
					name="profile[blood_type]"
					disabled={readOnly}
					value={bloodType}
					onChange={(e) => setBloodType(e.target.value)}
					className="form-control">
					<option value="">-- Blood Type --</option>
					{bType.map((type) => (
						<option key={type.toLowerCase()} value={type}>
							{type}
						</option>
					))}
				</select>
				{error?.blood_type && <FormError message={error.blood_type} keyword="Blood type" />}
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

export default ProfileForm;
