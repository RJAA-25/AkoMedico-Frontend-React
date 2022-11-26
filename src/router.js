import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Root from './routes/Root';
import RootError from './routes/errors/RootError';
import Landing from './routes/pages/landing/Landing';

import Login from './routes/pages/auth/Login';
import Register from './routes/pages/auth/Register';

import Protected from './routes/pages/Protected';
import GetStarted from './routes/pages/GetStarted';
import Confirmation from './routes/pages/Confirmation';

import Overview from './routes/pages/overview/Overview';

import Profile from './routes/pages/personal/Profile';

import Doctors from './routes/pages/people/doctors/Doctors';
import DoctorInfo from './routes/pages/people/doctors/DoctorInfo';
import DoctorsIndex from './routes/pages/people/doctors/DoctorsIndex';

import ContactInfo from './routes/pages/people/emergency-contacts/ContactInfo';
import ContactsIndex from './routes/pages/people/emergency-contacts/ContactsIndex';
import EmergencyContacts from './routes/pages/people/emergency-contacts/EmergencyContacts';

import ConditionInfo from './routes/pages/history/conditions/ConditionInfo';
import ConditionsIndex from './routes/pages/history/conditions/ConditionsIndex';
import ExistingConditions from './routes/pages/history/conditions/ExistingConditions';

import Consultations from './routes/pages/history/consultations/Consultations';
import ConsultationInfo from './routes/pages/history/consultations/ConsultationInfo';
import ConsultationsIndex from './routes/pages/history/consultations/ConsultationsIndex';

import Admission from './routes/pages/history/admissions/Admissions';
import AdmissionInfo from './routes/pages/history/admissions/AdmissionInfo';
import AdmissionsIndex from './routes/pages/history/admissions/AdmissionsIndex';

import Settings from './routes/pages/settings/Settings';

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
				<Route path="doctors" element={<Doctors />}>
					<Route index element={<DoctorsIndex />} />
					<Route path=":doctorId" element={<DoctorInfo />} />
				</Route>
				<Route path="emergency-contacts" element={<EmergencyContacts />}>
					<Route index element={<ContactsIndex />} />
					<Route path=":contactId" element={<ContactInfo />} />
				</Route>
				<Route path="existing-conditions" element={<ExistingConditions />}>
					<Route index element={<ConditionsIndex />} />
					<Route path=":conditionId" element={<ConditionInfo />} />
				</Route>
				<Route path="consultations" element={<Consultations />}>
					<Route index element={<ConsultationsIndex />} />
					<Route path=":consultationUid" element={<ConsultationInfo />} />
				</Route>
				<Route path="admissions" element={<Admission />}>
					<Route index element={<AdmissionsIndex />} />
					<Route path=":admissionUid" element={<AdmissionInfo />} />
				</Route>
				<Route path="settings" element={<Settings />} />
			</Route>
		</Route>
	)
);

export default router;
