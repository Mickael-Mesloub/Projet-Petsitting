import { Link } from "react-router-dom";

// À IMPLÉMENTER POUR HOME/LOGIN/REGISTER

const LogoutNav = (dispatcher, actionCreator) => {
    return (
        <>
            <div className="login-register-div">
                <ul className="login-register-ul">
                    <li><Link onClick={(e) => dispatcher(actionCreator())} className="login-register-links">Déconnexion</Link></li>
                </ul>
            </div>
            
        </>
    )
}

export default LogoutNav;