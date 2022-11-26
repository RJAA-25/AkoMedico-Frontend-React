import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import { authActions } from '../../../store/auth';
import { userActions } from '../../../store/user';

import { loginUser } from '../../../api/session';
import { profileActions } from '../../../store/profile';

const Login = () => {
	console.log('Passed Login');
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	const handleLogin = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#session');
		const formData = new FormData(form);
		const res = await loginUser(formData);
		switch (res.status) {
			case 200:
				const {
					data: { user, profile },
				} = res;
				dispatch(authActions.login());
				dispatch(userActions.set(user));
				dispatch(profileActions.set(profile));
				!user.email_confirmed
					? navigate('/confirmation')
					: !profile
					? navigate('/get-started')
					: navigate('/overview');
				break;
			case 401:
				setError(res.data);
				break;
			default:
				setError({ error: res.message });
		}
	};

	return (
		<>
			{isAuthorized ? (
				<Navigate replace to="/overview" />
			) : (
				<div className="flex-grow-1 d-flex justify-content-center">
					<form id="session" onSubmit={handleLogin} className="mt-5">
						<div className="my-3">
							<label htmlFor="session[email]" className="form-label fw-semibold">
								Email
							</label>
							<input
								type="text"
								id="session[email]"
								name="session[email]"
								className="form-control"
							/>
						</div>
						<div className="my-3">
							<label htmlFor="session[password]" className="form-label fw-semibold">
								Password
							</label>
							<input
								type="password"
								id="session[password]"
								name="session[password]"
								className="form-control"
							/>
						</div>
						{error?.error && <p className="text-danger">{error.error}</p>}
						<div className="my-5 d-flex flex-column justify-content-center align-items-center ">
							<button className="btn btn-warning rounded-pill px-5 text-center mb-5">
								Login
							</button>
							<Link to="/register" className="btn btn-light rounded-pill px-5">
								Register
							</Link>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
