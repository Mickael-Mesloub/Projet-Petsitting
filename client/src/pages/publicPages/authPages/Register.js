// import '../assets/styles/logPages.scss';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser, logoutUser} from '../../../store/slices/user/userSlice.js';
import { Link } from "react-router-dom"
import Header from '../../../components/Header.js';
import LogNav from '../../../components/auth/LogNav.js';
import { authRegister } from '../../../helpers/auth.js';

const Register = () => {

    // ***** STATES *****
    
    const [token, setToken] = useState('');

    // ***** REDUX *****
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    
    // ***** USEFFECTS *****


    // ***** FONCTIONS *****
    const handleSubmit = (event) => {
        event.preventDefault();
        authRegister(event, 'http://localhost:9900/register', token, setToken, dispatch, loginUser);
    }
    console.log(token);

    return (
    
            <>
            {user.isLogged ?
                <>
                    <div className="login-register-div">
                        <ul className="login-register-ul">
                            <li>
                                <Link 
                                    onClick={() => {
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
                    <h2>Inscrivez-vous</h2>
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" className="register-form">
                    <div className="register-form-inputs">
                            <label htmlFor="firstName">Prénom : </label>
                            <input type="text" name="firstName" id="firstName" placeholder="Prénom" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="lastName">Nom : </label>
                            <input type="text" name="lastName" id="lastName" placeholder="Nom" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="tel" name="phone" id="phone" placeholder="Format XX XX XX XX XX" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="file">Avatar : </label>
                            <input type="file" name="file" accept="image/jpeg, image/png" id="file" />
                        </div>
                        <input type="submit" name="submit" className="register-btn" value="M'inscrire" />
                    </form>
                    
                </>
            }
        </>
    );
}

export default Register;