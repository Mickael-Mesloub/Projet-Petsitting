import { getMethod, postMethod, putMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from './../../components/Header';
import './styles/profile.scss';

const UpdateProfile = () => {

    const [profile, setProfile] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState([]);

    const {user} = useSelector(state => state);
    const { userId } = useParams();

    useEffect(() => {
        console.log(avatar);
    },[avatar])

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod(`http://localhost:9900/profile/${userId}`, token)
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('firstName' , firstName)
        formData.append('lastName' , lastName)
        formData.append('phone' , phone)
        formData.append('email' , email)
        formData.append('password' , password)
        for(const i of avatar) {
            formData.append('file' , i)
        }
        
        console.log(formData);
        putMethod(`http://localhost:9900/profile/${userId}/update-profile` , token, formData)
            .then((data) => console.log(`UPDATEPROFILE LIGNE 43 - DATA : ${data.user.avatar}`))
            .then((error) => console.log(error))
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
                            <input type="text" name="firstName" id="firstName" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="lastName">Nom : </label>
                            <input type="text" name="lastName" id="lastName" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="tel" name="phone" id="phone" placeholder="Format XX XX XX XX XX" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />  
                        </div>
                        <div className="register-form-inputs">
                            <label htmlFor="file">Avatar : </label>
                            <input type="file" name="file" accept="image/jpeg, image/png" id="file" onChange={(e) => setAvatar(e.target.files)} />
                        </div>
                        <input type="submit" name="submit" className="register-btn" value="Modifier" />
                    </form>
                </>
            }
        </>
    )
}

export default UpdateProfile;

