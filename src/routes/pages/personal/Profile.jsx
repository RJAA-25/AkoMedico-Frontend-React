import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { profileActions } from '../../../store/profile';

import { getProfile } from '../../../api/request';
import { fetchAccess } from '../../../utilities/access';

const Profile = () => {
	console.log('Passed Profile');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const profile = useSelector((state) => state.profile.data);
	const profileState = useSelector((state) => state.profile.isChanged);

	const fetchData = async () => {
		const res = await fetchAccess({ dispatch, navigate }, null, getProfile);
		const { profile } = res;
		dispatch(profileActions.set(profile));
	};

	useEffect(() => {
		if (!profileState) fetchData();
		// eslint-disable-next-line
	}, []);

	return <div>Profile</div>;
};

export default Profile;
