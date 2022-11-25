import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

import FormError from '../error/FormError';

const AdmissionForm = ({
	admission = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const doctors = useSelector((state) => state.doctor.data);

	const [diagnosis, setDiagnosis] = useState(admission.diagnosis || '');
	const [healthFacility, setHealthFacility] = useState(admission.health_facility || '');
	const [startDate, setStartDate] = useState(admission.start_date || '');
	const [endDate, setEndDate] = useState(admission.end_date || '');
	const [notes, setNotes] = useState(admission.notes || '');
	const [doctorIds, setDoctorIds] = useState(admission.doctors || []);

	const toggleValue = (arr, value) => {
		if (value === '') return arr;
		return arr.includes(Number(value))
			? arr.filter((el) => el !== Number(value))
			: [...arr, Number(value)];
	};

	const handleCancel = () => {
		setDiagnosis(admission.diagnosis);
		setHealthFacility(admission.health_facility);
		setStartDate(admission.start_date);
		setEndDate(admission.end_date);
		setNotes(admission.notes);
		setDoctorIds(admission.doctors);
		setError({});
		setReadOnly(true);
	};

	return (
		<form id="admission" onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="admission[diagnosis]"
					readOnly={readOnly}
					value={diagnosis}
					placeholder="Diagnosis"
					onChange={(e) => setDiagnosis(e.target.value)}
				/>
				{error?.diagnosis && <FormError message={error.diagnosis} keyword="Diagnosis" />}
			</div>

			<div>
				<input
					type="text"
					name="admission[health_facility]"
					readOnly={readOnly}
					value={healthFacility}
					placeholder="Health Facility"
					onChange={(e) => setHealthFacility(e.target.value)}
				/>
				{error?.health_facility && (
					<FormError message={error.health_facility} keyword="Health facility" />
				)}
			</div>

			<div>
				<input
					type="date"
					name="admission[start_date]"
					readOnly={readOnly}
					value={startDate}
					placeholder="Start Date"
					onChange={(e) => setStartDate(e.target.value)}
				/>
				{error?.start_date && <FormError message={error.start_date} keyword="Start date" />}
			</div>

			<div>
				<input
					type="date"
					name="admission[end_date]"
					readOnly={readOnly}
					value={endDate}
					placeholder="End Date"
					onChange={(e) => setEndDate(e.target.value)}
				/>
				{error?.end_date && <FormError message={error.end_date} keyword="End date" />}
			</div>

			<div hidden={!readOnly}>
				<p>Doctor(s)</p>
				<ul>
					{doctorIds.map((id) => {
						const doctor = doctors.find((doc) => doc.id === Number(id));
						return (
							<li key={generateKey()}>
								<Link
									to={`/doctors/${id}`}>{`${doctor.last_name}, ${doctor.first_name}`}</Link>
							</li>
						);
					})}
				</ul>
			</div>

			<div hidden={readOnly}>
				<select
					name="admission[doctor_ids][]"
					multiple={true}
					size={5}
					disabled={readOnly}
					value={doctorIds}
					onChange={(e) => setDoctorIds(toggleValue(doctorIds, e.target.value))}>
					<option value="">-- Doctors --</option>
					{doctors.map((doctor) => (
						<option
							key={generateKey()}
							value={doctor.id}>{`${doctor.last_name}, ${doctor.first_name}`}</option>
					))}
				</select>
			</div>

			<div>
				<textarea
					name="admission[notes]"
					readOnly={readOnly}
					value={notes}
					placeholder="Enter your notes here"
					onChange={(e) => setNotes(e.target.value)}
					cols="30"
					rows="10"></textarea>
				{error?.notes && <FormError message={error.notes} keyword="Notes" />}
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

export default AdmissionForm;
