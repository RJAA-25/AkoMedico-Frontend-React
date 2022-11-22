import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const Protected = () => {
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	return isAuthorized ? <Outlet /> : <Navigate replace to="login" />;
};

export default Protected;
