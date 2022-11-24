import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { consultationActions } from '../../../store/consultation';

import { fetchAccess } from '../../../utilities/access';
import { getConsultations } from '../../../api/request';

const Consultations = () => {
	console.log('Passed Consultations');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const consultations = useSelector((state) => state.consultation.data);
	const consultationState = useSelector((state) => state.consultation.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getConsultations);
		const { consultations } = res;
		dispatch(consultationActions.set(consultations));
	};

	useEffect(() => {
		if (!consultationState) fetchData();
		// eslint-disable-next-line
	}, []);
	return <div>Consultations</div>;
};

export default Consultations;
