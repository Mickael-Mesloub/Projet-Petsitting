import { getMethod, postMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from './../../components/Header';
import './styles/profile.scss';

const UpdateProfile = () => {

    const [profile, setProfile] = useState([])
    const {user} = useSelector(state => state);
    const { userId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod(`http://localhost:9900/profile/${userId}`, token)
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("ok");
    }

    console.log(user);
    return (

        <>
            {profile.user && 
            <>
                <h1>Modifier le profil</h1>
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
                            <input type="phone" name="phone" id="phone" placeholder="Téléphone"/>
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

    )
}

export default UpdateProfile;

