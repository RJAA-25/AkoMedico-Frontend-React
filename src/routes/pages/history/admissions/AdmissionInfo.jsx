import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { admissionActions } from '../../../../store/admission';

import ResultForm from '../../../../components/form/ResultForm';
import AbstractForm from '../../../../components/form/AbstractForm';
import AdmissionForm from '../../../../components/form/AdmissionForm';
import PrescriptionForm from '../../../../components/form/PrescriptionForm';

import { destroyAdmission, updateAdmission } from '../../../../api/admission';

const AdmissionInfo = () => {
	console.log('Passed AdmissionsInfo');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { admissionUid } = useParams();
	const doctorState = useSelector((state) => state.doctor.isChanged);
	const admissions = useSelector((state) => state.admission.data);
	const admission = admissions.find((adm) => adm.uid === admissionUid);

	const index = admissions.indexOf(admission);
	const copy = [...admissions];

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#admission');
		const formData = new FormData(form);
		const res = await updateAdmission(formData, admission.uid);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { admission: updated },
				} = res;
				copy.splice(index, 1, updated);
				dispatch(admissionActions.set(copy));
				setError({});
				setReadOnly(true);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		const res = await destroyAdmission(admission.uid);
		switch (res.status) {
			case 200:
				copy.splice(index, 1);
				dispatch(admissionActions.set(copy));
				console.log('Redirect to Admissions');
				navigate('/admissions', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			AdmissionInfo
			{doctorState && admission && (
				<>
					<button onClick={() => navigate(-1)}>Back</button>
					{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
					<button onClick={handleDelete}>Delete</button>
					<AdmissionForm
						admission={admission}
						readOnly={readOnly}
						setReadOnly={setReadOnly}
						error={error}
						setError={setError}
						update={true}
						handleSubmit={handleUpdate}
					/>
					<hr />
					<p>Prescriptions</p>
					<PrescriptionForm
						dispatch={dispatch}
						storeAction={admissionActions}
						index={index}
						copy={copy}
						target={admission}
						issue={'admission'}
					/>
					<hr />
					<p>Results</p>
					<ResultForm
						dispatch={dispatch}
						storeAction={admissionActions}
						index={index}
						copy={copy}
						target={admission}
						issue={'admission'}
					/>
					<hr />
					<p>Abstract</p>
					<AbstractForm
						dispatch={dispatch}
						storeAction={admissionActions}
						index={index}
						copy={copy}
						target={admission}
					/>
				</>
			)}
		</div>
	);
};

export default AdmissionInfo;
