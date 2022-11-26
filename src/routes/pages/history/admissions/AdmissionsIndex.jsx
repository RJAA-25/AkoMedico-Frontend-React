import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { admissionActions } from '../../../../store/admission';

import AdmissionsList from '../../../../components/list/AdmissionsList';
import AdmissionForm from '../../../../components/form/AdmissionForm';

import { createAdmission } from '../../../../api/admission';

const AdmissionsIndex = () => {
	console.log('Passed AdmissionIndex');
	const [create, setCreate] = useState(false);
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const doctorState = useSelector((state) => state.doctor.isChanged);
	const admissions = useSelector((state) => state.admission.data);
	const admitState = useSelector((state) => state.admission.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#admission');
		const formData = new FormData(form);
		const res = await createAdmission(formData);
		switch (res.status) {
			case 201:
				console.log(res.data.admission);
				const {
					data: { admission },
				} = res;
				dispatch(admissionActions.set([...admissions, admission]));
				setError({});
				setCreate(false);
				navigate(`/admissions/${admission.uid}`);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div className="flex-grow-1">
			{admitState && doctorState && (
				<>
					{!create && (
						<>
							<button
								className="btn btn-warning rounded-pill px-5 my-3"
								onClick={() => setCreate(true)}>
								Add
							</button>
							<AdmissionsList admissions={admissions} />
						</>
					)}
					{create && (
						<>
							<AdmissionForm
								error={error}
								setError={setError}
								handleSubmit={handleCreate}
							/>
							<button
								onClick={() => {
									setError({});
									setCreate(false);
								}}>
								Cancel
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AdmissionsIndex;
