import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const { toggle: { show = false, check, setCheck } = {} } = props;

  const authorized = useSelector((state) => state.auth.isAuthenticated);
  const destination = authorized ? "/overview" : "/";

  return (
    <header className="navbar bg-neutral text-primary absolute top-0 left-0 z-50 justify-center">
      {show ? (
        <div className="navbar-start">
          <button
            className="btn btn-square btn-ghost lg:hidden swap swap-rotate"
            onClick={() => setCheck((state) => !state)}
          >
            <Icon
              icon={faBars}
              className={`fill-current h-5 w-5 ${
                check ? "swap-on" : "swap-off"
              }`}
            />
            <Icon
              icon={faXmark}
              className={`fill-current h-5 w-5 ${
                check ? "swap-off" : "swap-on"
              }`}
            />
          </button>
        </div>
      ) : (
        <div className="navbar-start"></div>
      )}
      <div className="navbar-center">
        <Link
          to={destination}
          className="btn btn-ghost normal-case text-xl text-white"
        >
          AkoMedico
        </Link>
      </div>
      <div className="navbar-end"></div>
    </header>
  );
};

export default Navbar;
