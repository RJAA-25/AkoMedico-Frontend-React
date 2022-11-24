import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { admissionActions } from '../../../store/admission';

import { getAdmissions } from '../../../api/request';
import { fetchAccess } from '../../../utilities/access';

const Admission = () => {
	console.log('Passed Admissions');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const admissions = useSelector((state) => state.admission.data);
	const admissionState = useSelector((state) => state.admission.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getAdmissions);
		const { admissions } = res;
		dispatch(admissionActions.set(admissions));
	};

	useEffect(() => {
		if (!admissionState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>Admission</div>;
};

export default Admission;
