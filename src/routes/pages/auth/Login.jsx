import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../../store/auth';
import { loginUser } from '../../../api/session';

const Login = () => {
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthorized) navigate('/overview', { replace: true });
		// eslint-disable-next-line
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#session');
		const formData = new FormData(form);
		const res = await loginUser(formData);
		if (res.status === 200) {
			dispatch(authActions.login());
			navigate('/overview');
		} else if (res.status === 401) {
			setError(res.data);
		} else {
			setError({ error: res.message });
		}
	};

	return (
		<div>
			<form id="session" onSubmit={handleLogin}>
				<div>
					<input type="text" name="session[email]" placeholder="Email" />
				</div>
				<div>
					<input type="password" name="session[password]" placeholder="Password" />
				</div>
				<button>Login</button>
			</form>
			{error?.error && <p>{error.error}</p>}
		</div>
	);
};

export default Login;
