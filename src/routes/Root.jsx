import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Root = () => {
	const navigate = useNavigate();
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthorized) navigate('/overview', { replace: true });
		// eslint-disable-next-line
	}, []);

	return (
		<main>
			<h1>AkoMedico Root</h1>
			<nav>
				<ul>
					<li>
						<Link to="register">Register</Link>
					</li>
					<li>
						<Link to="login">Login</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</main>
	);
};

export default Root;
