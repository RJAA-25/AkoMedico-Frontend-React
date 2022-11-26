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
		<form id="consultation" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="consultation[diagnosis]" className="form-label fw-semibold">
					Diagnosis
				</label>
				<input
					type="text"
					id="consultation[diagnosis]"
					name="consultation[diagnosis]"
					readOnly={readOnly}
					value={diagnosis}
					onChange={(e) => setDiagnosis(e.target.value)}
					className="form-control"
				/>
				{error?.diagnosis && <FormError message={error.diagnosis} keyword="Diagnosis" />}
			</div>

			<div className="my-3">
				<label htmlFor="consultation[health_facility]" className="form-label fw-semibold">
					Health Facility
				</label>
				<input
					type="text"
					id="consultation[health_facility]"
					name="consultation[health_facility]"
					readOnly={readOnly}
					value={healthFacility}
					onChange={(e) => setHealthFacility(e.target.value)}
					className="form-control"
				/>
				{error?.health_facility && (
					<FormError message={error.health_facility} keyword="Health facility" />
				)}
			</div>

			<div className="my-3">
				<label htmlFor="consultation[schedule]" className="form-label fw-semibold">
					Schedule
				</label>
				<input
					type="date"
					id="consultation[schedule]"
					name="consultation[schedule]"
					readOnly={readOnly}
					value={schedule}
					onChange={(e) => setSchedule(e.target.value)}
					className="form-control"
				/>
			</div>

			<div hidden={!readOnly}>
				<p className="fw-semibold">Doctor(s)</p>
				<div className="d-flex flex-wrap">
					{doctorIds.map((id) => {
						const doctor = doctors.find((doc) => doc.id === Number(id));
						return (
							<Link
								to={`/doctors/${id}`}
								key={generateKey()}
								className="my-3 btn btn-warning rounded-pill px-">{`${doctor.last_name}, ${doctor.first_name}`}</Link>
						);
					})}
				</div>
			</div>

			<div className="my-3" hidden={readOnly}>
				<label htmlFor="consultation[doctor_ids]" className="form-label fw-semibold">
					Doctor(s)
				</label>
				<select
					id="consultation[doctor_ids]"
					name="consultation[doctor_ids][]"
					multiple={true}
					size={5}
					disabled={readOnly}
					value={doctorIds}
					onChange={(e) => setDoctorIds(toggleValue(doctorIds, e.target.value))}
					className="form-control">
					<option value="">-- Doctors --</option>
					{doctors.map((doctor) => (
						<option
							key={generateKey()}
							value={doctor.id}>{`${doctor.last_name}, ${doctor.first_name}`}</option>
					))}
				</select>
			</div>

			<div className="my-3">
				<label htmlFor="consultation[notes]" className="form-label fw-semibold">
					Notes
				</label>
				<textarea
					id="consultation[notes"
					name="consultation[notes]"
					readOnly={readOnly}
					value={notes}
					placeholder="Enter your notes here"
					onChange={(e) => setNotes(e.target.value)}
					cols="30"
					rows="10"
					className="form-control"></textarea>
				{error?.notes && <FormError message={error.notes} keyword="Notes" />}
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

export default ConsultationForm;
