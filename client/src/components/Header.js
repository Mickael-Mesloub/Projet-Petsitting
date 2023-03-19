import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import './header.scss'
import { CgMenuHotdog, CgClose } from 'react-icons/cg'
import logo from '../assets/images/logo3.jpg'


const Header = () => {

    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (

        <header className={showMenu ? "show-menu" : ""} >
            <div className='header-logo'><img src={logo} alt="" /></div>
            <button className="burger-menu-btn" onClick={handleMenuClick}><CgMenuHotdog style={{ fontSize: "34px" }} /></button>
            {showMenu && (

                <nav className="navbar">
                    <button className="burger-menu-btn" onClick={handleMenuClick}><CgClose style={{ fontSize: "34px", color: "#fff" }} /></button>
                    <ul className="navbar-links">
                        <li>
                            <Link to="/" className="navbar-link">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/news" className="navbar-link">
                                News
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className="navbar-link">
                                Prestations
                            </Link>
                        </li>

                        {user.isLogged && (
                            <li>
                                <Link to="/profile" className="navbar-link">
                                    Profil
                                </Link>
                            </li>
                        )}

                        {user.isAdmin && (
                            <li>
                                <Link to="/admin" className="navbar-link">
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </header>

    )
}

export default Header