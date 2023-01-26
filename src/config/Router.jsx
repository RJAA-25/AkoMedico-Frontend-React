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
import Doctors from "../routes/protected/Doctors";
import EmergencyContacts from "../routes/protected/EmergencyContacts";
import ExistingConditions from "../routes/protected/ExistingConditions";
import Consultations from "../routes/protected/Consultations";
import Admissions from "../routes/protected/Admissions";

import RootError from "../components/error/RootError";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<RootError />}>
      <Route index element={<Root />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Protected />}>
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="settings" element={<Settings />} />
        <Route path="overview" element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="emergency-contacts" element={<EmergencyContacts />} />
        <Route path="existing-conditions" element={<ExistingConditions />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="admissions" element={<Admissions />} />
      </Route>
    </Route>
  )
);
