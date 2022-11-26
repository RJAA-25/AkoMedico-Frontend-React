import { generateKey } from '../../utilities/keygen';

const FormError = ({ message, keyword, custom = false }) => {
	return (
		<>
			{message.slice(-1).map((error) =>
				custom ? (
					<span key={generateKey()} className="text-start p-2 text-danger">
						{error}
					</span>
				) : (
					<span key={generateKey()} className="text-start p-2 text-danger">
						{keyword} {error.toLowerCase()}
					</span>
				)
			)}
		</>
	);
};

export default FormError;
