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
		<form id="admission" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="admission[diagnosis]" className="form-label fw-semibold">
					Diagnosis
				</label>
				<input
					type="text"
					id="admission[diagnosis]"
					name="admission[diagnosis]"
					readOnly={readOnly}
					value={diagnosis}
					onChange={(e) => setDiagnosis(e.target.value)}
					className="form-control"
				/>
				{error?.diagnosis && <FormError message={error.diagnosis} keyword="Diagnosis" />}
			</div>

			<div className="my-3">
				<label htmlFor="admission[health_facility]" className="form-label fw-semibold">
					Health Facility
				</label>
				<input
					type="text"
					id="admission[health_facility]"
					name="admission[health_facility]"
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
				<label htmlFor="admission[start_date]" className="form-label fw-semibold">
					Start Date
				</label>
				<input
					type="date"
					id="admission[start_date]"
					name="admission[start_date]"
					readOnly={readOnly}
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className="form-control"
				/>
				{error?.start_date && <FormError message={error.start_date} keyword="Start date" />}
			</div>

			<div className="my-3">
				<label htmlFor="admission[end_date]" className="form-label fw-semibold">
					End Date
				</label>
				<input
					type="date"
					id="admission[end_date]"
					name="admission[end_date]"
					readOnly={readOnly}
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="form-control"
				/>
				{error?.end_date && <FormError message={error.end_date} keyword="End date" />}
			</div>

			<div className="my-3" hidden={!readOnly}>
				<p className="fw-semibold">Doctor(s)</p>
				<div className="d-flex flex-wrap">
					{doctorIds.map((id) => {
						const doctor = doctors.find((doc) => doc.id === Number(id));
						return (
							<Link
								to={`/doctors/${id}`}
								key={generateKey()}
								className="my-3 btn btn-warning rounded-pill px-5">{`${doctor.last_name}, ${doctor.first_name}`}</Link>
						);
					})}
				</div>
			</div>

			<div className="my-3" hidden={readOnly}>
				<label htmlFor="admission[doctor_ids]" className="form-label fw-semibold">
					Doctor(s)
				</label>
				<select
					id="admission[doctor_ids]"
					name="admission[doctor_ids][]"
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
				<label htmlFor="admission[notes]" className="form-label fw-semibold">
					Notes
				</label>
				<textarea
					id="admission[notes]"
					name="admission[notes]"
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

export default AdmissionForm;
