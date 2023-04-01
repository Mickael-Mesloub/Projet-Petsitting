import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './styles.scss'
import { useState } from "react";

const Navbar = () => {

    const { user } = useSelector(state => state);
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
    }


    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>

            <div className={menu_class}>
                <ul className="burger-menu-links navbar-links">

                    {user && user.isAdmin && (
                        <li><Link to="/admin" className="burger-menu-link navbar-link">Admin</Link></li>
                    )}

                    <li><Link to="/" className="burger-menu-link navbar-link">Accueil</Link></li>
                    <li><Link to="/news" className="burger-menu-link navbar-link">News</Link></li>
                    <li><Link to="/services" className="burger-menu-link navbar-link">Prestations</Link></li>
                    <li><Link to="/contact" className="burger-menu-link navbar-link">Contact</Link></li>

                    {user && !user.isLogged &&
                        <>
                            <li><Link to="/login" className="burger-menu-link navbar-link auth-link">Connexion</Link></li>
                            <li><Link to="/register" className="burger-menu-link navbar-link auth-link">Inscription</Link></li>
                        </>
                    }

                    {user && user.isLogged && (
                        <>
                            <li><Link to={`/profile/${user._id}`} className="burger-menu-link navbar-link logged-link">Profil</Link></li>
                            <li><Link to={`/${user._id}/booking`} className="burger-menu-link navbar-link logged-link">Réserver</Link></li>
                            <li><Link to='/logout' className="burger-menu-link navbar-link logout-link">Déconnexion</Link></li>
                        </>
                    )}

                </ul>

            </div>


        </div>

    )
}

export default Navbar;