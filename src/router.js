import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './routes/Root';
import Landing from './routes/pages/landing/Landing';
import Login from './routes/pages/auth/Login';
import Register from './routes/pages/auth/Register';
import Overview from './routes/pages/overview/Overview';

import RootError from './routes/errors/RootError';
import Protected from './routes/pages/Protected';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<RootError />}>
			<Route index element={<Landing />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route element={<Protected />}>
				<Route path="overview" element={<Overview />} />
			</Route>
		</Route>
	)
);

export default router;
