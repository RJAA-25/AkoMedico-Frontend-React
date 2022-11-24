import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { contactActions } from '../../../store/contact';

import { fetchAccess } from '../../../utilities/access';
import { getEmergencyContacts } from '../../../api/request';

const EmergencyContacts = () => {
	console.log('Passed EmergencyContacts');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const contacts = useSelector((state) => state.contact.data);
	const contactState = useSelector((state) => state.contact.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getEmergencyContacts);
		const { contacts } = res;
		dispatch(contactActions.set(contacts));
	};

	useEffect(() => {
		if (!contactState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>EmergencyContacts</div>;
};

export default EmergencyContacts;
