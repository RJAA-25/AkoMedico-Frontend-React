import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { profileActions } from '../../store/profile';

import ProfileForm from '../../components/form/ProfileForm';

import { fetchAccess } from '../../utilities/access';
import { createProfile } from '../../api/profile';

const GetStarted = () => {
	console.log('Passed GetStarted');
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const profile = useSelector((state) => state.profile.data);
	const profileState = useSelector((state) => state.profile.isChanged);

	const handleCreate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#profile');
		const formData = new FormData(form);
		const res = await createProfile(formData);
		switch (res.status) {
			case 201:
				const {
					data: { profile },
				} = res;
				dispatch(profileActions.set(profile));
				navigate('/overview');
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	useEffect(() => {
		if (!profileState) {
			fetchAccess({ dispatch, navigate }, '/overview', null);
		} else {
			if (profile) navigate('/overview', { replace: true });
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Get Started
			<ProfileForm error={error} setError={setError} handleSubmit={handleCreate} />
		</div>
	);
};

export default GetStarted;
