import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../../../api/request';
import { fetchAccess } from '../../../utilities/access';

const Doctors = () => {
	console.log('Passed Doctors');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const doctors = useSelector((state) => state.doctor.data);
	const doctorState = useSelector((state) => state.doctor.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getDoctors);
	};

	useEffect(() => {
		if (!doctorState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>Doctors</div>;
};

export default Doctors;
