import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import FormError from '../../../components/navigation/error/FormError';

import { registerUser } from '../../../api/register';

const Register = () => {
	console.log('Passed Register');
	const [error, setError] = useState({});

	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#register');
		const formData = new FormData(form);
		const res = await registerUser(formData);
		switch (res.status) {
			case 201:
				console.log(res);
				navigate('/');
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	return (
		<>
			{isAuthorized ? (
				<Navigate replace to="/overview" />
			) : (
				<div>
					<form id="register" onSubmit={handleRegister}>
						<div>
							<input
								type="text"
								name="register[first_name]"
								placeholder="First Name"
							/>
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
							<input
								type="password"
								name="register[password]"
								placeholder="Password"
							/>
							{error?.password && (
								<FormError message={error.password} keyword="Password" />
							)}
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
			)}
		</>
	);
};

export default Register;
