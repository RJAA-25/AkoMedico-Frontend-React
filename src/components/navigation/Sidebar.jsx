import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const {
    toggle: { setCheck },
  } = props;

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
    <div className="bg-base-100 w-80">
      <ul className="menu bg-base-100 p-4">
        <li onClick={() => setCheck(false)}>
          <NavLink to="/overview">Overview</NavLink>
        </li>

        <li className="menu-title my-3">
          <span>PERSONAL</span>
        </li>
        {personal.map((item) => (
          <li onClick={() => setCheck(false)} className="ml-3">
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}

        <li className="menu-title my-3">
          <span>PEOPLE</span>
        </li>
        {people.map((item) => (
          <li onClick={() => setCheck(false)} className="ml-3">
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}

        <li className="menu-title my-3">
          <span>HISTORY</span>
        </li>
        {history.map((item) => (
          <li onClick={() => setCheck(false)} className="ml-3">
            <NavLink to={item[0]}>{item[1]}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
