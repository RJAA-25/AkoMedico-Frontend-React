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
		<form id="profile" onSubmit={handleSubmit}>
			<div>
				<input
					type="date"
					name="profile[birth_date]"
					readOnly={readOnly}
					value={birthdate}
					placeholder="Birthdate"
					onChange={(e) => setBirthdate(e.target.value)}
				/>
				{error?.birth_date && (
					<FormError message={error.birth_date} keyword="Birthdate name" custom={true} />
				)}
			</div>

			<div>
				<input
					type="text"
					name="profile[address]"
					readOnly={readOnly}
					value={address}
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
				/>
				{error?.address && <FormError message={error.address} keyword="Address" />}
			</div>

			<div>
				<select
					name="profile[nationality]"
					disabled={readOnly}
					value={nationality}
					onChange={(e) => setNationality(e.target.value)}>
					<option value="">-- Nationality --</option>
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

			<div>
				<select
					name="profile[civil_status]"
					disabled={readOnly}
					value={civilStatus}
					onChange={(e) => setCivilStatus(e.target.value)}>
					<option value="">-- Civil Status --</option>
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

			<div>
				<input
					type="text"
					name="profile[contact_number]"
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

			<div>
				<input
					type="number"
					name="profile[height]"
					readOnly={readOnly}
					value={height}
					placeholder="Height (meters)"
					onChange={(e) => setHeight(e.target.value)}
				/>
				{error?.height && <FormError message={error.height} keyword="Height" />}
			</div>

			<div>
				<input
					type="number"
					name="profile[weight]"
					readOnly={readOnly}
					value={weight}
					placeholder="Weight (kilograms)"
					onChange={(e) => setWeight(e.target.value)}
				/>
				{error?.weight && <FormError message={error.weight} keyword="Weight" />}
			</div>

			<div>
				<select
					name="profile[sex]"
					disabled={readOnly}
					value={sex}
					onChange={(e) => setSex(e.target.value)}>
					<option value="">-- Sex --</option>
					{s.map((sex) => (
						<option key={sex.toLowerCase()} value={sex}>
							{sex}
						</option>
					))}
				</select>
				{error?.sex && <FormError message={error.sex} keyword="Sex" />}
			</div>

			<div>
				<select
					name="profile[blood_type]"
					disabled={readOnly}
					value={bloodType}
					onChange={(e) => setBloodType(e.target.value)}>
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

export default ProfileForm;
