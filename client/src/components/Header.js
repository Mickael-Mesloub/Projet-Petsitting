import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './header.scss'

const Header = () => {
    
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    return(

        <header>
            <nav>
                <ul>
                    <li><Link to="/" className="nav-link">Accueil</Link></li>
                    <li><Link to="/news" className="nav-link">News</Link></li>
                    <li><Link to="/services" className="nav-link">Prestations</Link></li>

                    {user.isLogged &&
                    
                        <li><Link to="/profile" className="nav-link">Profil</Link></li>

                    
                    }

                    {user.isAdmin && 
                        <li><Link to="/admin" className="nav-link">Admin</Link></li>
                    }
                </ul>
            </nav>
        </header>
        
    )  
}

export default Header