import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../../components/navigation/Sidebar';

const Protected = () => {
	console.log('Passed Protected');

	const user = useSelector((state) => state.user.data);
	const profile = useSelector((state) => state.profile.data);

	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	return (
		<>
			{isAuthorized ? (
				<div className="flex-grow-1 d-flex">
					{user.email_confirmed && profile && <Sidebar />}
					<Outlet />
				</div>
			) : (
				<Navigate replace to="/login" />
			)}
		</>
	);
};

export default Protected;
