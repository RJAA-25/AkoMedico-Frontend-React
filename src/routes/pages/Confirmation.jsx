import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAccess } from '../../utilities/access';
import { resendConfirmation } from '../../api/confirmation';

const Confirmation = () => {
	console.log('Passed Confirmation');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.data);
	const userState = useSelector((state) => state.user.isChanged);

	const handleResend = async (e) => {
		e.preventDefault();
		const res = await resendConfirmation();
		switch (res.data) {
			case 200:
				console.log(res.data.message);
				break;
			case 202:
				console.log(res.data.message);
				break;
			default:
				console.log({ error: res.message });
		}
	};

	useEffect(() => {
		if (!userState) {
			fetchAccess({ dispatch, navigate }, '/overview', null);
		} else {
			if (user.email_confirmed) navigate('/get-started', { replace: true });
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			Confirmation
			<button onClick={handleResend}>Resend Confirmation Email</button>
		</div>
	);
};

export default Confirmation;
