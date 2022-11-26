import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div className="flex-grow-1 border d-flex flex-column justify-content-center align-items-center mb-5">
			<Link to="/login" className="btn btn-warning btn-lg fs-6 px-5 m-3 rounded-pill">
				Login
			</Link>
			<Link to="/register" className="btn btn-warning btn-lg fs-6 px-5 m-3 rounded-pill">
				Register
			</Link>
		</div>
	);
};

export default Landing;
