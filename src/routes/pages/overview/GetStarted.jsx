import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { profileActions } from '../../../store/profile';

import FormError from '../../../components/navigation/error/FormError';

import { fetchAccess } from '../../../utilities/access';
import { createProfile } from '../../../api/profile';
import { countries, civilStatus, sex, bloodType } from '../../../utilities/selection';

const GetStarted = () => {
	console.log('Passed GetStarted');
	const [error, setError] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const profile = useSelector((state) => state.profile.data);
	const profileState = useSelector((state) => state.profile.isChanged);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = document.querySelector('#profile');
		const formData = new FormData(form);
		const res = await createProfile(formData);
		switch (res.status) {
			case 201:
				console.log(res);
				const {
					data: { profile },
				} = res;
				dispatch(profileActions.set(profile));
				navigate('/overview');
				break;
			case 422:
				setError(res.data.errors);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	useEffect(() => {
		if (!profileState) {
			fetchAccess({ dispatch, navigate }, '/overview', null);
		} else {
			if (profile) navigate('/overview', { replace: true });
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Get Started
			<form id="profile" onSubmit={handleSubmit}>
				<div>
					<input type="date" name="profile[birth_date]" />
					{error?.birth_date && (
						<FormError
							message={error.birth_date}
							keyword="Birth date name"
							custom={true}
						/>
					)}
				</div>

				<div>
					<input type="text" name="profile[address]" placeholder="Address" />
					{error?.address && <FormError message={error.address} keyword="Address" />}
				</div>

				<div>
					<select name="profile[nationality]">
						<option key="nationality" value="">
							Nationality
						</option>
						{countries.map((country) => (
							<option
								key={country.alpha_2_code.toLowerCase()}
								value={country.nationality}>
								{country.nationality}
							</option>
						))}
					</select>
					{error?.nationality && (
						<FormError message={error.nationality} keyword="Nationality" />
					)}
				</div>

				<div>
					<select name="profile[civil_status]">
						<option key="civil_status" value="">
							Civil Status
						</option>
						{civilStatus.map((status) => (
							<option key={status.toLowerCase()} value={status}>
								{status}
							</option>
						))}
					</select>
					{error?.civil_status && (
						<FormError message={error.civil_status} keyword="Civil status" />
					)}
				</div>

				<div>
					<input
						type="text"
						name="profile[contact_number]"
						placeholder="Contact Number"
					/>
					{error?.contact_number && (
						<FormError
							message={error.contact_number}
							keyword="Contact number"
							custom={true}
						/>
					)}
				</div>

				<div>
					<input
						type="number"
						name="profile[height]"
						step={0.01}
						min={0.01}
						// max={3}
						placeholder="Height"
					/>
					{error?.height && <FormError message={error.height} keyword="Height" />}
				</div>

				<div>
					<input
						type="number"
						name="profile[weight]"
						step={0.1}
						min={0.1}
						placeholder="Weight"
					/>
					{error?.weight && <FormError message={error.weight} keyword="Weight" />}
				</div>

				<div>
					<select name="profile[sex]">
						<option key="sex" value="">
							Sex
						</option>
						{sex.map((s) => (
							<option key={s.toLowerCase()} value={s}>
								{s}
							</option>
						))}
					</select>
					{error?.sex && <FormError message={error.sex} keyword="Sex" />}
				</div>

				<div>
					<select name="profile[blood_type]">
						<option key="blood_type" value="">
							Blood Type
						</option>
						{bloodType.map((type) => (
							<option key={type.toLowerCase()} value={type}>
								{type}
							</option>
						))}
					</select>
					{error?.blood_type && (
						<FormError message={error.blood_type} keyword="Blood type" />
					)}
				</div>

				<button>Submit</button>
			</form>
		</div>
	);
};

export default GetStarted;
