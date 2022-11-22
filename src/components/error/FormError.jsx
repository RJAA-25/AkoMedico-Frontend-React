import React from 'react';

const FormError = ({ message, keyword, custom = false }) => {
	return (
		<ul>
			{message.slice(-1).map((error) =>
				custom ? (
					<li>{error}</li>
				) : (
					<li>
						{keyword} {error.toLowerCase()}
					</li>
				)
			)}
		</ul>
	);
};

export default FormError;
