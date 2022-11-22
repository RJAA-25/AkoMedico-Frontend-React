import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { authActions } from '../../store/auth';
import { userActions } from '../../store/user';
import { profileActions } from '../../store/profile';
import { contactActions } from '../../store/contact';
import { conditionActions } from '../../store/condition';
import { doctorActions } from '../../store/doctor';
import { consultationActions } from '../../store/consultation';
import { admissionActions } from '../../store/admission';

import { logoutUser } from '../../api/session';

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const res = await logoutUser();
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
				navigate('/login');
				break;
			case 401:
				console.log(res.data);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<div>
			<ul>
				<li>
					<NavLink to="/overview">Overview</NavLink>
				</li>
			</ul>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Sidebar;
