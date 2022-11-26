import { Outlet } from 'react-router-dom';
import Header from '../components/navigation/Header';

const Root = () => {
	console.log('Passed Root');

	return (
		<main className="container min-vh-100 py-5 d-flex flex-column ">
			<Header />
			<Outlet />
		</main>
	);
};

export default Root;
