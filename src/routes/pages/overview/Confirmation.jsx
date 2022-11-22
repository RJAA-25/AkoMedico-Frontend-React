import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { resendConfirmation } from '../../../api/confirmation';

const Confirmation = () => {
	const user = useSelector((state) => state.user.data);

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

	return (
		<>
			{user.email_confirmed ? (
				<Navigate replace to="/overview" />
			) : (
				<div>
					Confirmation
					<button onClick={handleResend}>Resend Confirmation Email</button>
				</div>
			)}
		</>
	);
};

export default Confirmation;
