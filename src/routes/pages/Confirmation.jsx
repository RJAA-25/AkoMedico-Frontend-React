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
		<div className="flex-grow-1 d-flex justify-content-center  border border-primary">
			<div className="p-3">
				<p className="text-center my-5">
					A confirmation email has been sent to your account. Please verify your account
					to continue.
				</p>
				<div className="text-center">
					<p>Didn't get any confirmation email?</p>
					<button onClick={handleResend} className="btn btn-warning rounded-pill px-5">
						Resend Confirmation
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
