import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from '../../../../components/header/Header';
import { loginUser } from "../../../../store/slices/user/userSlice";
import '../../styles/profile.scss';

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
    const dispatch = useDispatch();

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))
    },[userId])

    useEffect(() => {
        console.log(profile.user);
    },[profile.user])


    const handleSubmit = (event) => {
        event.preventDefault();
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
        putFormData(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/update-profile` , formData)
            .then((data) => dispatch(loginUser(data.user)))
            .then((error) => console.log(error))
    }

    return (

        <>
            {profile.user && 
                <>
                    <Header />
                    <h1>Modifier le profil</h1>
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                        <div>
                            <label htmlFor="firstName">Prénom : </label>
                            <input type="text" name="firstName" id="firstName" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="lastName">Nom : </label>
                            <input type="text" name="lastName" id="lastName" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="phone">Téléphone : </label>
                            <input type="tel" name="phone" id="phone" placeholder="Format XX XX XX XX XX" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email : </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe : </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />  
                        </div>
                        <div>
                            <label htmlFor="file">Avatar : </label>
                            <input type="file" name="file" accept="image/jpeg, image/png" id="file" onChange={(e) => setAvatar(e.target.files)} />
                        </div>
                        <input type="submit" name="submit" value="Modifier" />
                    </form>
                </>
            }
        </>
    )
}

export default UpdateProfile;

