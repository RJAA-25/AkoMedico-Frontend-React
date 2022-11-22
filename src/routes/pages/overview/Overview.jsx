import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getOverview } from '../../../api/overview';
import Sidebar from '../../../components/navigation/Sidebar';
import { userActions } from '../../../store/user';
import { profileActions } from '../../../store/profile';
import { contactActions } from '../../../store/contact';
import { conditionActions } from '../../../store/condition';

const Overview = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userState = useSelector((state) => state.user.isChanged);
	const profileState = useSelector((state) => state.profile.isChanged);
	const contactState = useSelector((state) => state.contact.isChanged);
	const conditionState = useSelector((state) => state.condition.isChanged);

	const user = useSelector((state) => state.user.data);
	const profile = useSelector((state) => state.profile.data);
	// const contacts = useSelector((state) => state.contact.data);
	// const conditions = useSelector((state) => state.condition.data);

	const fetchData = async () => {
		const res = await getOverview();
		switch (res.status) {
			case 200:
				const {
					data: { user, profile, contacts, conditions },
				} = res;
				dispatch(userActions.set(user));
				dispatch(profileActions.set(profile));
				dispatch(contactActions.set(contacts));
				dispatch(conditionActions.set(conditions));
				if (!user.email_confirmed) navigate('/confirmation', { replace: true });
				if (!profile) navigate('/get-started', { replace: true });
				break;
			case 401:
				console.log(res.data);
				navigate('/login', { replace: true });
				break;
			case 403:
				console.log(res.data);
				navigate('/confirmation', { replace: true });
				break;
			default:
				console.log({ error: res.message });
		}
	};

	useEffect(() => {
		if (!userState || !profileState || !contactState || !conditionState) fetchData();
		if (!user.email_confirmed) navigate('/confirmation', { replace: true });
		if (!profile) navigate('/get-started', { replace: true });
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Overview
			<Sidebar />
		</div>
	);
};

export default Overview;
