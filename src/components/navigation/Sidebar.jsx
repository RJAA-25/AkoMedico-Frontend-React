import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/auth';
import { logoutUser } from '../../api/session';

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const res = await logoutUser();
		if (res.status === 200) {
			dispatch(authActions.logout());
			navigate('/login');
		} else if (res.status === 401) {
			// For Notification
			console.log(res.data);
		} else {
			// For Notification
			console.log({ error: res.message });
		}
	};

	return (
		<div>
			This is a sidebar shown when user is authenticated
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Sidebar;
