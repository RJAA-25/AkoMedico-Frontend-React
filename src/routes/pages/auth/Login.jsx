import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

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
				<div>
					<form id="session" onSubmit={handleLogin}>
						<div>
							<input type="text" name="session[email]" placeholder="Email" />
						</div>
						<div>
							<input
								type="password"
								name="session[password]"
								placeholder="Password"
							/>
						</div>
						<button>Login</button>
					</form>
					{error?.error && <p>{error.error}</p>}
				</div>
			)}
		</>
	);
};

export default Login;
