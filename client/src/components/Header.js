import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import './componentsStyles/header.scss'
import { CgMenuHotdog, CgClose } from 'react-icons/cg'
import { GiDogHouse } from 'react-icons/gi'
import logo from '../assets/images/logo3.jpg'


const Header = () => {

    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        console.log(user);
    },[])


    console.log(user)

    return (

        <header className={showMenu ? "show-menu" : "" } >
            {/* <div className='header-logo'><img src={logo} alt="" /></div> */}
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

                        {user && user.isLogged && (
                            <li>
                                <Link to={`/profile/${user.id}`} className="navbar-link">
                                    Profil
                                </Link>
                            </li>
                        )}

                        {user && user.isAdmin && (
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