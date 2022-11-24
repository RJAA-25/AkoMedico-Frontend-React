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
		<nav>
			<div>
				<NavLink to="/overview">Overview</NavLink>
			</div>

			<div>
				<p>PERSONAL</p>
				<ul>
					<li>
						<NavLink to="/profile">Profile</NavLink>
					</li>
				</ul>
			</div>

			<div>
				<p>PEOPLE</p>
				<ul>
					<li>
						<NavLink to="/doctors">Doctors</NavLink>
					</li>
					<li>
						<NavLink to="/emergency-contacts">Emergency Contacts</NavLink>
					</li>
				</ul>
			</div>

			<div>
				<p>HISTORY</p>
				<ul>
					<li>
						<NavLink to="/existing-conditions">Existing Conditions</NavLink>
					</li>
					<li>
						<NavLink to="/consultations">Consultations</NavLink>
					</li>
					<li>
						<NavLink to="/admissions">Admission</NavLink>
					</li>
				</ul>
			</div>

			<div>
				<NavLink to="/settings">Settings</NavLink>
			</div>

			<button onClick={handleLogout}>Logout</button>
		</nav>
	);
};

export default Sidebar;
