import { useRouteError } from 'react-router-dom';

const RootError = () => {
	const error = useRouteError();
	console.log(error);

	return (
		<div>
			<h1>Root Error Page</h1>
			<p>{error.status}</p>
			<p>{error.statusText}</p>
		</div>
	);
};

export default RootError;
