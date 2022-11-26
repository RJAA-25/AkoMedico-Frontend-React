import { useRouteError } from 'react-router-dom';
import Header from '../../components/navigation/Header';

const RootError = () => {
	const error = useRouteError();
	console.log(error);

	return (
		<div>
			<Header />
			<div className=" d-flex justify-content-center align-items-center flex-column mt-5">
				<h2 className="fw-bold fs-1">{error.status}</h2>
				<p className="fs-2">{error.statusText}</p>
				<p className="text-muted">(Sorry)</p>
			</div>
		</div>
	);
};

export default RootError;
