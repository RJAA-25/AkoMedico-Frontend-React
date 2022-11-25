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
		<form id="condition" onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="condition[diagnosis]"
					readOnly={readOnly}
					value={diagnosis}
					placeholder="Diagnosis"
					onChange={(e) => setDiagnosis(e.target.value)}
				/>
				{error?.diagnosis && <FormError message={error.diagnosis} keyword="Diagnosis" />}
			</div>

			<div>
				<input
					type="date"
					name="condition[start_date]"
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
					name="condition[end_date]"
					readOnly={readOnly}
					value={endDate}
					placeholder="End Date"
					onChange={(e) => setEndDate(e.target.value)}
				/>
				{error?.end_date && <FormError message={error.end_date} keyword="Start date" />}
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

export default ConditionForm;
