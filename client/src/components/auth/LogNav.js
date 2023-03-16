import { Link } from "react-router-dom";
// import '../assets/styles/header.scss'

const LogNav = () => {

    return(

        <div className="login-register-div">
            <ul className="login-register-ul">
                <li><Link to="/login" className="login-register-links">Connexion</Link></li>
                <li><Link to="/register" className="login-register-links">Inscription</Link></li>
            </ul>
        </div>

    )

}

export default LogNav;