import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { consultationActions } from '../../../../store/consultation';

import ConsultationsList from '../../../../components/list/ConsultationsList';
import ConsultationForm from '../../../../components/form/ConsultationForm';

import { createConsultation } from '../../../../api/consultation';

const ConsultationsIndex = () => {
	console.log('Passed ConsultationsIndex');
	const [create, setCreate] = useState(false);
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const doctorState = useSelector((state) => state.doctor.isChanged);
	const consultations = useSelector((state) => state.consultation.data);
	const consultState = useSelector((state) => state.consultation.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#consultation');
		const formData = new FormData(form);
		const res = await createConsultation(formData);
		switch (res.status) {
			case 201:
				console.log(res.data.consultation);
				const {
					data: { consultation },
				} = res;
				dispatch(consultationActions.set([...consultations, consultation]));
				setError({});
				setCreate(false);
				navigate(`/consultations/${consultation.uid}`);
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
			{consultState && doctorState && (
				<>
					{!create && (
						<>
							<button
								className="btn btn-warning rounded-pill px-5 my-3"
								onClick={() => setCreate(true)}>
								Add
							</button>
							<ConsultationsList consultations={consultations} />
						</>
					)}
					{create && (
						<>
							<ConsultationForm
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

export default ConsultationsIndex;
