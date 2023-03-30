import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './styles.scss'

const Navbar = () => {

    const {user} = useSelector(state => state);

    return (
        <nav className="navbar">
            <ul className="navbar-links">

                {user && user.isAdmin && (
                    <li><Link to="/admin" className="navbar-link">Admin</Link></li>
                )}

                <li><Link to="/" className="navbar-link">Accueil</Link></li>
                <li><Link to="/news" className="navbar-link">News</Link></li>
                <li><Link to="/services" className="navbar-link">Prestations</Link></li>
                <li><Link to="/contact" className="navbar-link">Contact</Link></li>

                {user && !user.isLogged && (
                    <div className="tablet-desktop-auth-links">
                        <li><Link to="/login" className="navbar-link auth-link">Connexion</Link></li>
                        <li><Link to="/register" className="navbar-link auth-link">Inscription</Link></li>
                    </div>
                )}

                {user && user.isLogged && !user.isAdmin && (
                    <>
                        <li><Link to={`/profile/${user._id}`} className="navbar-link logged-link">Profil</Link></li>
                        <li><Link to={`/${user._id}/booking`} className="navbar-link logged-link">Réserver</Link></li>
                    </>
                )}

                {user && user.isLogged &&(
                    <li><Link to='/logout' className="navbar-link logout-link">Déconnexion</Link></li>
                )}      
                
            </ul>
        </nav>
    )
}

export default Navbar;