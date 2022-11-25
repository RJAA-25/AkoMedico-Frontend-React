import { generateKey } from '../../utilities/keygen';

const FormError = ({ message, keyword, custom = false }) => {
	return (
		<ul>
			{message.slice(-1).map((error) =>
				custom ? (
					<li key={generateKey()}>{error}</li>
				) : (
					<li key={generateKey()}>
						{keyword} {error.toLowerCase()}
					</li>
				)
			)}
		</ul>
	);
};

export default FormError;
