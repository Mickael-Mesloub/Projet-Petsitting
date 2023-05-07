import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiUserCircle, BiDesktop } from "react-icons/bi";
import { BsPower } from "react-icons/bs";
import Tooltip from "../tooltip/Tooltip";
import "./styles.scss";

const SecondaryMenu = () => {
  const { user } = useSelector((state) => state);

  return (
    <nav className="secondary-menu">
      <ul>
        {user && user.isAdmin && (
          <li className="admin-link">
            <Tooltip text={"Admin"}>
              <Link to="/admin" className="secondary-menu-link">
                <BiDesktop />
              </Link>
            </Tooltip>
          </li>
        )}
        {user && !user.isLogged && (
          <>
            <li className="secondary-menu-auth-link">
              <Link to="/login" className="secondary-menu-link ">
                Connexion
              </Link>
            </li>
            <li className="secondary-menu-auth-link">
              <Link to="/register" className="secondary-menu-link ">
                Inscription
              </Link>
            </li>
          </>
        )}

        {user && user.isLogged && (
          <>
            <li>
              <Tooltip text={"Profil"}>
                <Link
                  to={`/profile`}
                  className="secondary-menu-link logged-link"
                >
                  <BiUserCircle />
                </Link>
              </Tooltip>
            </li>
            {/* <li>
              <Tooltip text={"Réserver"}>
                <Link
                  to={`/${user._id}/booking`}
                  className="secondary-menu-link logged-link"
                >
                  <BiCalendar />
                </Link>
              </Tooltip>
            </li> */}
            <li className="logout-link">
              <Link to="/logout" className="secondary-menu-link logout-icon">
                <BsPower />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SecondaryMenu;
