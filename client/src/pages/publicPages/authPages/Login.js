// import '../assets/styles/logPages.scss';
// import '../assets/styles/logNav.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../../store/slices/user/userSlice.js';
import { Link } from "react-router-dom"
import Header from '../../../components/Header.js';
import LogNav from '../../../components/auth/LogNav.js';
import { authLogin } from '../../../helpers/auth.js';

const Login = () => {
    
    const {user} = useSelector(state => state);
    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        authLogin(event, 'http://localhost:9900/login', token, setToken, dispatch, loginUser);    
    }
    
    return (

        <>
            {user.isLogged ?
                <>
                    <div className="login-register-div">
                        <ul className="login-register-ul">
                            <li>
                                <Link onClick={() => 
                                    {
                                        dispatch(logoutUser()); 
                                        localStorage.removeItem('jwt')
                                    }} 
                                    className="login-register-links" >
                                    Déconnexion
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Header />
                </>
                :
                <>  
                    <LogNav />
                    <Header />
                    <h2>Connectez-vous</h2>
                    <form onSubmit={handleSubmit} method="post" className="register-form">
                        <div className="register-form-inputs">
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <input type="submit" name="submit" className="register-btn" value="Connexion" />
                    </form>
                    {user.isLogged && 
                        <span className="register-msg">Vous êtes connecté !</span>
                    }
                    {user.isLogged === false && 
                    <span className="register-msg error">Cet utilisateur n'existe pas.</span>
                    }
                
                </>

            }

        </>
    
    );
    
};

export default Login;