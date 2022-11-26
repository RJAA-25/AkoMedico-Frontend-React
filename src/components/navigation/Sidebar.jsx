import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { logoutUser } from '../../api/session';
import { removeAccess } from '../../utilities/access';

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await removeAccess({ dispatch, navigate }, logoutUser);
	};

	return (
		<nav className="d-flex flex-column p-5 border-end border-2">
			<NavLink
				to="/overview"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Overview
			</NavLink>

			<p className="my-3 text-muted">PERSONAL</p>
			<NavLink
				to="/profile"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Profile
			</NavLink>

			<p className="my-3 text-muted">PEOPLE</p>
			<NavLink
				to="/doctors"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Doctors
			</NavLink>
			<NavLink
				to="/emergency-contacts"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Emergency Contacts
			</NavLink>

			<p className="my-3 text-muted">HISTORY</p>
			<NavLink
				to="/existing-conditions"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Existing Conditions
			</NavLink>
			<NavLink
				to="/consultations"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Consultations
			</NavLink>
			<NavLink
				to="/admissions"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Admission
			</NavLink>

			{/* <NavLink
				to="/settings"
				className={({ isActive }) =>
					isActive
						? 'btn btn-warning rounded-pill px-5 my-2'
						: 'btn btn-light rounded-pill px-5 my-2'
				}>
				Settings
			</NavLink> */}

			<hr />

			<button onClick={handleLogout} className="btn btn-danger rounded-pill px-5 my-5">
				Logout
			</button>
		</nav>
	);
};

export default Sidebar;
