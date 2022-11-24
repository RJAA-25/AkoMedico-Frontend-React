import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { profileActions } from '../../../store/profile';

import ProfileForm from '../../../components/form/ProfileForm';

import { fetchAccess } from '../../../utilities/access';
import { updateProfile } from '../../../api/profile';

const Profile = () => {
	console.log('Passed Profile');
	const [error, setError] = useState({});
	const [readOnly, setReadOnly] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const profile = useSelector((state) => state.profile.data);
	const profileState = useSelector((state) => state.profile.isChanged);

	const fetchData = async () => {
		await fetchAccess({ dispatch, navigate }, null, null);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#profile');
		const formData = new FormData(form);
		const res = await updateProfile(formData);
		switch (res.status) {
			case 200:
				console.log(res.data.message);
				const {
					data: { profile },
				} = res;
				dispatch(profileActions.set(profile));
				setError({});
				setReadOnly(true);
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	useEffect(() => {
		if (!profileState) fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Profile
			{readOnly && <button onClick={() => setReadOnly(false)}>Edit</button>}
			{profileState && (
				<ProfileForm
					profile={profile}
					readOnly={readOnly}
					setReadOnly={setReadOnly}
					error={error}
					setError={setError}
					update={true}
					handleSubmit={handleUpdate}
				/>
			)}
		</div>
	);
};

export default Profile;
