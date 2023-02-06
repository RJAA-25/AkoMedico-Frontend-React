import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const {
    toggle: { show = false, check, setCheck },
  } = props;

  const authorized = useSelector((state) => state.auth.isAuthenticated);
  const destination = authorized ? "/overview" : "/";

  return (
    <header className="navbar bg-base-100 border border-slate-500">
      {show && (
        <button
          className="btn btn-square btn-ghost lg:hidden swap swap-rotate"
          onClick={() => setCheck((state) => !state)}
        >
          <Icon
            icon={faBars}
            className={`fill-current h-5 w-5 ${check ? "swap-on" : "swap-off"}`}
          />
          <Icon
            icon={faXmark}
            className={`fill-current h-5 w-5 ${check ? "swap-off" : "swap-on"}`}
          />
        </button>
      )}
      <div className="flex-1">
        <Link to={destination} className="btn btn-ghost normal-case text-xl">
          AkoMedico
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
