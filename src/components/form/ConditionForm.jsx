import { useState } from 'react';

import FormError from '../error/FormError';

const ConditionForm = ({
	condition = {},
	readOnly = false,
	setReadOnly = null,
	error,
	setError,
	update = false,
	handleSubmit,
}) => {
	const [diagnosis, setDiagnosis] = useState(condition.diagnosis || '');
	const [startDate, setStartDate] = useState(condition.start_date || '');
	const [endDate, setEndDate] = useState(condition.end_date || '');

	const handleCancel = () => {
		setDiagnosis(condition.diagnosis);
		setStartDate(condition.start_date);
		setEndDate(condition.end_date);
		setError({});
		setReadOnly(true);
	};
	return (
		<form id="condition" onSubmit={handleSubmit} className="my-5">
			<div className="my-3">
				<label htmlFor="condition[diagnosis]" className="form-label fw-semibold">
					Diagnosis
				</label>
				<input
					type="text"
					id="condition[diagnosis"
					name="condition[diagnosis]"
					readOnly={readOnly}
					value={diagnosis}
					onChange={(e) => setDiagnosis(e.target.value)}
					className="form-control"
				/>
				{error?.diagnosis && <FormError message={error.diagnosis} keyword="Diagnosis" />}
			</div>

			<div className="my-3">
				<label htmlFor="condition[start_date]" className="form-label fw-semibold">
					Start Date
				</label>
				<input
					type="date"
					id="condition[start_date]"
					name="condition[start_date]"
					readOnly={readOnly}
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className="form-control"
				/>
				{error?.start_date && <FormError message={error.start_date} keyword="Start date" />}
			</div>

			<div className="my-3">
				<label htmlFor="condition[end_date]" className="form-label fw-semibold">
					End Date
				</label>
				<input
					type="date"
					id="condition[end_date]"
					name="condition[end_date]"
					readOnly={readOnly}
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="form-control"
				/>
				{error?.end_date && <FormError message={error.end_date} keyword="Start date" />}
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

export default ConditionForm;
