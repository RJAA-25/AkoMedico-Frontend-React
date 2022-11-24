import { Outlet } from 'react-router-dom';

const Root = () => {
	console.log('Passed Root');

	return (
		<main>
			<h1>AkoMedico Root</h1>
			<Outlet />
		</main>
	);
};

export default Root;
