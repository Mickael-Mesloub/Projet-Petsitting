import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import './styles.scss'
import { CgMenuHotdog, CgClose } from 'react-icons/cg'
import logo from '../../assets/images/logo5.png'


const Header = () => {

    const { user } = useSelector(state => state);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <header>
                <div className="background-icon"><img src={logo} alt='Logo de Rubieland' /></div>
                <div className="main-title">RubieLand</div>
                <button className="burger-menu-btn" onClick={handleMenuClick}><CgMenuHotdog style={{ fontSize: "34px", color:"#fff"}} /></button>
                
                {/* <nav className={showMenu ? "burger-menu" : "navbar"}>
                    <button className="burger-menu-btn" onClick={handleMenuClick}><CgClose style={{ fontSize: "34px", color: "#fff" }} /></button>
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
                </nav> */}
            </header>
        </>
    )
}

export default Header