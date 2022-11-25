import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { doctorActions } from '../../../../store/doctor';

import DoctorsList from './DoctorsList';
import DoctorForm from '../../../../components/form/DoctorForm';

import { createDoctor } from '../../../../api/doctor';

const DoctorsIndex = () => {
	console.log('Passed DoctorsIndex');
	const [create, setCreate] = useState(false);
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const doctors = useSelector((state) => state.doctor.data);
	const doctorState = useSelector((state) => state.doctor.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#doctor');
		const formData = new FormData(form);
		const res = await createDoctor(formData);
		switch (res.status) {
			case 201:
				console.log(res.data.doctor);
				const {
					data: { doctor },
				} = res;
				dispatch(doctorActions.set([...doctors, doctor]));
				setError({});
				setCreate(false);
				navigate(`/doctors/${doctor.id}`);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			DoctorsIndex
			{doctorState && (
				<>
					{!create && (
						<>
							<p>Your List of Doctors</p>
							<DoctorsList doctors={doctors} />
							<button onClick={() => setCreate(true)}>Add</button>
						</>
					)}
					{create && (
						<>
							<DoctorForm
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

export default DoctorsIndex;
