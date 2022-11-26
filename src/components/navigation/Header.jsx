import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
	const isAuthorized = useSelector((state) => state.auth.isAuthenticated);

	return (
		<section className="container-fluid border-bottom border-2 text-center">
			<Link
				to={isAuthorized ? '/overview' : '/'}
				className="fs-1 fw-bold btn btn-light btn-lg rounded-pill px-5 mb-2">
				AkoMedico
			</Link>
			<p className="d-none d-md-block">
				A lifestyle app that makes access to personal health information easy
			</p>
		</section>
	);
};

export default Header;
