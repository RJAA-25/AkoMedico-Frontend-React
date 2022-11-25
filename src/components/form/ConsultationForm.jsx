import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { generateKey } from '../../utilities/keygen';

import FormError from '../error/FormError';

const ConsultationForm = ({
	consultation = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const doctors = useSelector((state) => state.doctor.data);

	const [diagnosis, setDiagnosis] = useState(consultation.diagnosis || '');
	const [healthFacility, setHealthFacility] = useState(consultation.health_facility || '');
	const [schedule, setSchedule] = useState(consultation.schedule || '');
	const [notes, setNotes] = useState(consultation.notes || '');
	const [doctorIds, setDoctorIds] = useState(consultation.doctors || []);

	const toggleValue = (arr, value) => {
		if (value === '') return arr;
		return arr.includes(Number(value))
			? arr.filter((el) => el !== Number(value))
			: [...arr, Number(value)];
	};

	const handleCancel = () => {
		setDiagnosis(consultation.diagnosis);
		setHealthFacility(consultation.health_facility);
		setSchedule(consultation.schedule);
		setNotes(consultation.notes);
		setDoctorIds(consultation.doctors);
		setError({});
		setReadOnly(true);
	};
	return (
		<form id="consultation" onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="consultation[diagnosis]"
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
					name="consultation[health_facility]"
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
					name="consultation[schedule]"
					readOnly={readOnly}
					value={schedule}
					placeholder="Schedule"
					onChange={(e) => setSchedule(e.target.value)}
				/>
				{error?.schedule && <FormError message={error.schedule} keyword="Schedule" />}
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
					name="consultation[doctor_ids][]"
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
					name="consultation[notes]"
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

export default ConsultationForm;
