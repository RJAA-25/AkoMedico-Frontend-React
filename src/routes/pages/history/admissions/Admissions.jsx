import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { doctorActions } from '../../../../store/doctor';
import { admissionActions } from '../../../../store/admission';

import { getDoctors } from '../../../../api/request';
import { getAdmissions } from '../../../../api/request';
import { fetchAccess } from '../../../../utilities/access';

const Admission = () => {
	console.log('Passed Admissions');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const doctorState = useSelector((state) => state.doctor.isChanged);
	const admissionState = useSelector((state) => state.admission.isChanged);

	const fetchAdmissions = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getAdmissions);
		const { admissions } = res;
		dispatch(admissionActions.set(admissions));
	};

	const fetchDoctors = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getDoctors);
		const { doctors } = res;
		dispatch(doctorActions.set(doctors));
	};

	useEffect(() => {
		if (!admissionState) fetchAdmissions();
		if (!doctorState) fetchDoctors();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex-grow-1 p-5">
			<h2>Admission</h2>
			<Outlet />
		</div>
	);
};

export default Admission;
