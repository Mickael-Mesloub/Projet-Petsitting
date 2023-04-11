import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.scss";
import { useState } from "react";
import { BiLogIn, BiLogOut, BiUserCircle, BiCalendar } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";

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
    <>
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
      <nav className="main-nav">
        <div className={menu_class}>
          <ul className="burger-menu-links">
            <li>
              <Link to="/" onClick={updateMenu} className="burger-menu-link">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                onClick={updateMenu}
                className="burger-menu-link"
              >
                Actualités
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
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
