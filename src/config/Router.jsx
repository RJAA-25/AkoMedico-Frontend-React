import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "../routes/Root";
import Login from "../routes/Login";
import Register from "../routes/Register";
import Protected from "../routes/Protected";
import Confirmation from "../routes/protected/Confirmation";
import GetStarted from "../routes/protected/GetStarted";
import Settings from "../routes/protected/Settings";
import Overview from "../routes/protected/Overview";
import Profile from "../routes/protected/Profile";

import Doctors from "../routes/protected/doctors/Doctors";
import DoctorsIndex from "../routes/protected/doctors/DoctorsIndex";
import DoctorInfo from "../routes/protected/doctors/DoctorInfo";

import ExistingConditions from "../routes/protected/conditions/ExistingConditions";
import ConditionsIndex from "../routes/protected/conditions/ConditionsIndex";
import ConditionInfo from "../routes/protected/conditions/ConditionInfo";

import EmergencyContacts from "../routes/protected/contacts/EmergencyContacts";
import ContactsIndex from "../routes/protected/contacts/ContactsIndex";
import ContactInfo from "../routes/protected/contacts/ContactInfo";

import Consultations from "../routes/protected/Consultations";
import Admissions from "../routes/protected/Admissions";

import RootError from "../components/error/RootError";
import Layout from "../routes/protected/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<RootError />}>
      <Route index element={<Root />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Protected />}>
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route element={<Layout />}>
          <Route path="settings" element={<Settings />} />
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
          <Route path="consultations" element={<Consultations />} />
          <Route path="admissions" element={<Admissions />} />
        </Route>
      </Route>
    </Route>
  )
);
