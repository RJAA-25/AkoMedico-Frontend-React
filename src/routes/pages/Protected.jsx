import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const Protected = () => {
	console.log('Passed Protected');
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	return isAuthorized ? <Outlet /> : <Navigate replace to="/login" />;
};

export default Protected;
