// import '../assets/styles/logPages.scss';
// import '../assets/styles/logNav.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../../store/slices/user/userSlice.js';
import { Link } from "react-router-dom"
import Header from '../../../components/Header.js';
import LogNav from '../../../components/auth/LogNav.js';
import { authLogin } from '../../../helpers/auth.js';
import { postMethod } from './../../../helpers/fetch';
import { useEffect } from 'react';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append('email', email);
        // formData.append('password', password);

        postMethod(`${process.env.REACT_APP_BACKEND_URL}/login`, {email, password})
            .then((data) => {
                dispatch(loginUser(data.user));
                localStorage.setItem('jwt', data.token)
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        console.log(email, password);
    },[email, password])
    
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
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
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