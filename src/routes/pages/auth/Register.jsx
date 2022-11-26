import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import FormError from '../../../components/error/FormError';

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
				<div className="flex-grow-1 d-flex justify-content-center">
					<form id="register" onSubmit={handleRegister} className="mt-5">
						<div className="my-3">
							<label
								htmlFor="register[first_name]"
								className="form-label fw-semibold">
								First Name
							</label>
							<input
								type="text"
								id="register[first_name]"
								name="register[first_name]"
								className="form-control"
							/>
							{error?.first_name && (
								<FormError message={error.first_name} keyword="First name" />
							)}
						</div>
						<div className="my-3">
							<label htmlFor="register[last_name]" className="form-label fw-semibold">
								Last Name
							</label>
							<input
								type="text"
								id="register[last_name]"
								name="register[last_name]"
								className="form-control"
							/>
							{error?.last_name && (
								<FormError message={error.last_name} keyword="Last name" />
							)}
						</div>
						<div className="my-3">
							<label htmlFor="register[email]" className="form-label fw-semibold">
								Email
							</label>
							<input
								type="text"
								id="register[email]"
								name="register[email]"
								className="form-control"
							/>
							{error?.email && <FormError message={error.email} keyword="Email" />}
						</div>
						<div className="my-3">
							<label htmlFor="register[password]" className="form-label fw-semibold">
								Password
							</label>
							<input
								type="password"
								id="register[password]"
								name="register[password]"
								className="form-control"
							/>
							{error?.password && (
								<FormError message={error.password} keyword="Password" />
							)}
						</div>
						<div className="my-3">
							<label
								htmlFor="register[password_confirmation]"
								className="form-label fw-semibold">
								Confirm Password
							</label>
							<input
								type="password"
								id="register[password_confirmation]"
								name="register[password_confirmation]"
								className="form-control"
							/>
							{error?.password_confirmation && (
								<FormError
									message={error.password_confirmation}
									keyword="Confirmation password"
								/>
							)}
						</div>

						<div className="my-5 d-flex flex-column justify-content-center align-items-center ">
							<button className="btn btn-warning rounded-pill px-5 text-center mb-5">
								Register
							</button>
							<Link to="/login" className="btn btn-light rounded-pill px-5">
								Login
							</Link>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Register;
