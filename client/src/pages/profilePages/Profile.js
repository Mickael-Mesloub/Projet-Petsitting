import { getMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from './../../components/Header';
import './styles/profile.scss';
import { loginUser } from "../../store/slices/user/userSlice";

const Profile = () => {

    const [profile, setProfile] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state);
    const { userId } = useParams();

    useEffect(() => {
        if(user) {
            getMethod(`http://localhost:9900/profile/${userId}`)
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))
        }
        
    },[])

    console.log(user);

    return (
        <>
            {profile.user && 
                <>
                    <Header />
                    <h1>Profil</h1>
                    <div className="profile-container">
                        <h2>Vos informations personnelles</h2>
                        <div className="user-avatar"><img src={`http://localhost:9900/${profile.user.avatar}`} alt=""/></div>
                        <p>Prénom : {profile.user.firstName}</p>
                        <p>Nom : {profile.user.lastName}</p>
                        <p>Téléphone : {profile.user.phone}</p>
                        <p>Email : {profile.user.email}</p>
                        <div><Link to={`/profile/${userId}/update-profile`}>Modifier mon profil</Link></div>
                        <div><Link to={`/profile/${userId}/animals`}>Mes animaux</Link></div>
                    </div>
                </>
            }
            
        </>
    )

}

export default Profile;