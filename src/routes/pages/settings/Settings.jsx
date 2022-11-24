import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAccess } from '../../../utilities/access';

const Settings = () => {
	console.log('Passed Settings');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const user = useSelector((state) => state.user.data);
	const userState = useSelector((state) => state.user.isChanged);

	const fetchData = async () => {
		await fetchAccess({ dispatch, navigate }, null, null);
	};

	useEffect(() => {
		if (!userState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>Settings</div>;
};

export default Settings;
