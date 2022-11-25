import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { consultationActions } from '../../../../store/consultation';

import ConsultationForm from '../../../../components/form/ConsultationForm';

import { destroyConsultation, updateConsultation } from '../../../../api/consultation';

const ConsultationInfo = () => {
	console.log('Passed ConsultationInfo');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { consultationUid } = useParams();
	const doctorState = useSelector((state) => state.doctor.isChanged);
	const consultations = useSelector((state) => state.consultation.data);
	const consultation = consultations.find((cons) => cons.uid === consultationUid);

	const index = consultations.indexOf(consultation);
	const copy = [...consultations];

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#consultation');
		const formData = new FormData(form);
		const res = await updateConsultation(formData, consultation.uid);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { consultation: updated },
				} = res;
				copy.splice(index, 1, updated);
				dispatch(consultationActions.set(copy));
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
		const res = await destroyConsultation(consultation.uid);
		switch (res.status) {
			case 200:
				copy.splice(index, 1);
				dispatch(consultationActions.set(copy));
				console.log('Redirect to Consultations');
				navigate('/consultations', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};
	return (
		<div>
			ConsultationInfo
			{doctorState && consultation && (
				<>
					<button onClick={() => navigate(-1)}>Back</button>
					{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
					<button onClick={handleDelete}>Delete</button>
					<ConsultationForm
						consultation={consultation}
						readOnly={readOnly}
						setReadOnly={setReadOnly}
						error={error}
						setError={setError}
						update={true}
						handleSubmit={handleUpdate}
					/>
				</>
			)}
		</div>
	);
};

export default ConsultationInfo;
