import { authActions } from '../store/auth';
import { userActions } from '../store/user';
import { doctorActions } from '../store/doctor';
import { profileActions } from '../store/profile';
import { contactActions } from '../store/contact';
import { admissionActions } from '../store/admission';
import { conditionActions } from '../store/condition';
import { consultationActions } from '../store/consultation';

import { checkAccess } from '../api/request';

export const fetchAccess = async (tool, destination, access) => {
	const { dispatch, navigate } = tool;
	console.log('Access: Fetching Data');
	const res = await checkAccess();
	switch (res.status) {
		case 200:
			const {
				data: { user, profile },
			} = res;
			dispatch(userActions.set(user));
			dispatch(profileActions.set(profile));
			if (!user.email_confirmed) {
				console.log('Redirect to Confirmation');
				navigate('/confirmation', { replace: true });
			} else if (user.email_confirmed && !profile) {
				console.log('Redirect to GetStarted');
				navigate('/get-started', { replace: true });
			} else {
				if (destination) navigate(destination, { replace: true });
				if (access) {
					const data = await access();
					return data;
				}
			}
			break;
		case 401:
			console.log('Redirect to Login');
			dispatch(authActions.logout());
			navigate('/login', { replace: true });
			break;
		default:
			console.log({ error: res.message });
	}
};

export const removeAccess = async (tool, access) => {
	const { dispatch, navigate } = tool;
	console.log('Performing Reset');
	const res = await access();
	switch (res.status) {
		case 200:
			dispatch(authActions.logout());
			dispatch(userActions.reset());
			dispatch(profileActions.reset());
			dispatch(contactActions.reset());
			dispatch(conditionActions.reset());
			dispatch(doctorActions.reset());
			dispatch(consultationActions.reset());
			dispatch(admissionActions.reset());
			console.log('Redirect to Login');
			navigate('/login');
			break;
		case 401:
			console.log('Redirect to Login');
			dispatch(authActions.logout());
			navigate('/login', { replace: true });
			break;
		default:
			console.log({ error: res.message });
	}
};
