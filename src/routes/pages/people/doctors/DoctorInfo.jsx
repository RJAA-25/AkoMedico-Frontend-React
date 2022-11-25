import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { destroyDoctor, updateDoctor } from '../../../../api/doctor';

import DoctorForm from '../../../../components/form/DoctorForm';
import { doctorActions } from '../../../../store/doctor';

const DoctorInfo = () => {
	console.log('Passed DoctorInfo');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { doctorId } = useParams();
	const doctors = useSelector((state) => state.doctor.data);
	const doctor = doctors.find((doc) => doc.id === Number(doctorId));

	const index = doctors.indexOf(doctor);
	const copy = [...doctors];

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#doctor');
		const formData = new FormData(form);
		const res = await updateDoctor(formData, doctor.id);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { doctor: updated },
				} = res;
				// const index = doctors.indexOf(doctor);
				// const copy = [...doctors];
				copy.splice(index, 1, updated);
				dispatch(doctorActions.set(copy));
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
		const res = await destroyDoctor(doctor.id);
		switch (res.status) {
			case 200:
				copy.splice(index, 1);
				dispatch(doctorActions.set(copy));
				console.log('Redirect to Doctors');
				navigate('/doctors', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			{doctor && (
				<>
					<button onClick={() => navigate(-1)}>Back</button>
					{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
					<button onClick={handleDelete}>Delete</button>
					<DoctorForm
						doctor={doctor}
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

export default DoctorInfo;
