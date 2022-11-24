import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './routes/Root';
import RootError from './routes/errors/RootError';
import Landing from './routes/pages/landing/Landing';
import Login from './routes/pages/auth/Login';
import Register from './routes/pages/auth/Register';
import Protected from './routes/pages/Protected';
import Confirmation from './routes/pages/overview/Confirmation';
import GetStarted from './routes/pages/overview/GetStarted';
import Overview from './routes/pages/overview/Overview';
import Profile from './routes/pages/personal/Profile';
import Doctors from './routes/pages/people/Doctors';
import EmergencyContacts from './routes/pages/people/EmergencyContacts';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<RootError />}>
			<Route index element={<Landing />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route element={<Protected />}>
				<Route path="confirmation" element={<Confirmation />} />
				<Route path="get-started" element={<GetStarted />} />
				<Route path="overview" element={<Overview />} />
				<Route path="profile" element={<Profile />} />
				<Route path="doctors" element={<Doctors />} />
				<Route path="emergency-contacts" element={<EmergencyContacts />} />
			</Route>
		</Route>
	)
);

export default router;
