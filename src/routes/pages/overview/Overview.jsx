import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { doctorActions } from '../../../store/doctor';
import { contactActions } from '../../../store/contact';
import { conditionActions } from '../../../store/condition';
import { admissionActions } from '../../../store/admission';
import { consultationActions } from '../../../store/consultation';

import { getOverview } from '../../../api/request';
import { fetchAccess } from '../../../utilities/access';

const Overview = () => {
	console.log('Passed Overview');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const contactState = useSelector((state) => state.contact.isChanged);
	const conditionState = useSelector((state) => state.condition.isChanged);
	const doctorState = useSelector((state) => state.doctor.isChanged);
	const consultationState = useSelector((state) => state.consultation.isChanged);
	const admissionState = useSelector((state) => state.admission.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getOverview);
		const { contacts, conditions, doctors, consultations, admissions } = res;
		dispatch(contactActions.set(contacts));
		dispatch(conditionActions.set(conditions));
		dispatch(doctorActions.set(doctors));
		dispatch(consultationActions.set(consultations));
		dispatch(admissionActions.set(admissions));
	};

	useEffect(() => {
		if (
			!contactState ||
			!conditionState ||
			!doctorState ||
			!consultationState ||
			!admissionState
		)
			fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>Overview</div>;
};

export default Overview;
