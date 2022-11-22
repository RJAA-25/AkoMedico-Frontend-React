import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../../api/register';

import FormError from '../../../components/error/FormError';

const Register = () => {
	const [error, setError] = useState({});

	const navigate = useNavigate();
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthorized) navigate('/overview', { replace: true });
		// eslint-disable-next-line
	}, []);

	const handleRegister = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#register');
		const formData = new FormData(form);
		const res = await registerUser(formData);
		if (res.status === 201) {
			console.log(res);
		} else if (res.status === 422) {
			setError(res.data.errors);
		} else {
			setError({ error: res.message });
		}
	};

	return (
		<div>
			<form id="register" onSubmit={handleRegister}>
				<div>
					<input type="text" name="register[first_name]" placeholder="First Name" />
					{error?.first_name && (
						<FormError message={error.first_name} keyword="First name" />
					)}
				</div>
				<div>
					<input type="text" name="register[last_name]" placeholder="Last Name" />
					{error?.last_name && (
						<FormError message={error.last_name} keyword="Last name" />
					)}
				</div>
				<div>
					<input type="text" name="register[email]" placeholder="Email" />
					{error?.email && <FormError message={error.email} keyword="Email" />}
				</div>
				<div>
					<input type="password" name="register[password]" placeholder="Password" />
					{error?.password && <FormError message={error.password} keyword="Password" />}
				</div>
				<div>
					<input
						type="password"
						name="register[password_confirmation]"
						placeholder="Confirm Password"
					/>
					{error?.password_confirmation && (
						<FormError
							message={error.password_confirmation}
							keyword="Confirmation password"
						/>
					)}
				</div>
				<button>Register</button>
			</form>
		</div>
	);
};

export default Register;
