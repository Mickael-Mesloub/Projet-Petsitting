import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import './componentsStyles/header.scss'
import { CgMenuHotdog, CgClose } from 'react-icons/cg'
import { GiDogHouse } from 'react-icons/gi'

const Header = () => {

    const { user } = useSelector(state => state);
    console.log(user);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (

        <header className={showMenu ? "show-menu" : "" } >
            <div className="paw-icon"><GiDogHouse style={{fontSize: "200px", opacity: "0.2", color: "#f0f"}}/></div>
            <div className="main-title">RubieLand</div>
            <button className="burger-menu-btn" onClick={handleMenuClick}><CgMenuHotdog style={{ fontSize: "34px", color:"#fff"}} /></button>
            {showMenu && (

                <nav className="navbar navbar-transition">
                    <button className="burger-menu-btn" onClick={handleMenuClick}><CgClose style={{ fontSize: "34px", color: "#fff" }} /></button>
                    <ul className="navbar-links">
                        <li><Link to="/" className="navbar-link">Accueil</Link></li>
                        <li><Link to="/news" className="navbar-link">News</Link></li>
                        <li><Link to="/services" className="navbar-link">Prestations</Link></li>
                        <li><Link to="/login" className="navbar-link auth-link">Connexion</Link></li>
                        <li><Link to="/register" className="navbar-link auth-link">Inscription</Link></li>
                        <li><Link to="/contact" className="navbar-link">Contact</Link></li>

                        {user && user.isLogged && (
                            <>
                                <li><Link to='/logout' className="navbar-link">Déconnexion</Link></li>
                                <li><Link to={`/profile/${user._id}`} className="navbar-link">Profil</Link></li>
                                <li><Link to={`/${user._id}/booking`} className="navbar-link">Réserver</Link></li>
                            </>
                        )}

                        {user && user.isAdmin && (
                                <li><Link to="/admin" className="navbar-link">Admin</Link></li>
                        )}

                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header