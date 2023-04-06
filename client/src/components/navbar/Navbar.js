import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.scss";
import { useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state);
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <nav>
      <div
        className={
          isMenuClicked ? "burger-menu-btn clicked" : "burger-menu-btn"
        }
        onClick={updateMenu}
      >
        <div className={burger_class}></div>
        <div className={burger_class}></div>
        <div className={burger_class}></div>
      </div>

      <div className={menu_class}>
        <ul className="burger-menu-links">
          {user && user.isAdmin && (
            <li>
              <Link
                to="/admin"
                onClick={updateMenu}
                className="burger-menu-link"
              >
                Admin
              </Link>
            </li>
          )}

          <li>
            <Link to="/" onClick={updateMenu} className="burger-menu-link">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/news" onClick={updateMenu} className="burger-menu-link">
              News
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              onClick={updateMenu}
              className="burger-menu-link"
            >
              Prestations
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={updateMenu}
              className="burger-menu-link"
            >
              Contact
            </Link>
          </li>

          {user && !user.isLogged && (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={updateMenu}
                  className="burger-menu-link auth-link"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={updateMenu}
                  className="burger-menu-link auth-link"
                >
                  Inscription
                </Link>
              </li>
            </>
          )}

          {user && user.isLogged && (
            <>
              <li>
                <Link
                  to={`/profile/${user._id}`}
                  onClick={updateMenu}
                  className="burger-menu-link logged-link"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to={`/${user._id}/booking`}
                  onClick={updateMenu}
                  className="burger-menu-link logged-link"
                >
                  Réserver
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={updateMenu}
                  className="burger-menu-link logout-link"
                >
                  Déconnexion
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
