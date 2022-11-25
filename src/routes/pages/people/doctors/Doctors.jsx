import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDoctors } from '../../../../api/request';
import { fetchAccess } from '../../../../utilities/access';
import { doctorActions } from '../../../../store/doctor';

const Doctors = () => {
	console.log('Passed Doctors');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const doctors = useSelector((state) => state.doctor.data);
	const doctorState = useSelector((state) => state.doctor.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getDoctors);
		const { doctors } = res;
		dispatch(doctorActions.set(doctors));
	};

	useEffect(() => {
		if (!doctorState) fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Doctors
			<Outlet />
		</div>
	);
};

export default Doctors;
