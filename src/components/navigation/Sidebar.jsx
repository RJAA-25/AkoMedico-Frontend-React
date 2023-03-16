import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { generateKey } from "../../helpers/utilities";
import { logoutSession } from "../../utilities/functions/global";

const Sidebar = (props) => {
  const {
    toggle: { setCheck },
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const personal = [["/profile", "Profile"]];
  const people = [
    ["/doctors", "Doctors"],
    ["/emergency-contacts", "Emergency Contacts"],
  ];
  const history = [
    ["/existing-conditions", "Existing Conditions"],
    ["/consultations", "Consultations"],
    ["/admissions", "Admissions"],
  ];

  return (
    <div className="bg-base-100 w-80 mt-16 border flex flex-col">
      <ul className="menu bg-base-100 p-4 grow">
        <li onClick={() => setCheck(false)}>
          <NavLink to="/overview">Overview</NavLink>
        </li>
        <div className="divider"></div>
        <li className="menu-title mb-3">
          <span>PERSONAL</span>
        </li>
        {personal.map((item) => (
          <li
            key={generateKey()}
            onClick={() => setCheck(false)}
            className="ml-3"
          >
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}
        <li className="menu-title my-3">
          <span>PEOPLE</span>
        </li>
        {people.map((item) => (
          <li
            key={generateKey()}
            onClick={() => setCheck(false)}
            className="ml-3"
          >
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}
        <li className="menu-title my-3">
          <span>HISTORY</span>
        </li>
        {history.map((item) => (
          <li
            key={generateKey()}
            onClick={() => setCheck(false)}
            className="ml-3"
          >
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}
      </ul>
      <div className="p-4">
        <div className="divider"></div>
        <button
          className="btn btn-block btn-error"
          onClick={() => logoutSession(dispatch, navigate)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
