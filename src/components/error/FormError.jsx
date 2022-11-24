import React from 'react';

const FormError = ({ message, keyword, custom = false }) => {
	return (
		<ul>
			{message.slice(-1).map((error) =>
				custom ? (
					<li key={(Math.random() + 1).toString(36).substring(7)}>{error}</li>
				) : (
					<li key={(Math.random() + 1).toString(36).substring(7)}>
						{keyword} {error.toLowerCase()}
					</li>
				)
			)}
		</ul>
	);
};

export default FormError;
