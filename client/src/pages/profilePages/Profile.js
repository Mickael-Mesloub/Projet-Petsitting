import { getMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from './../../components/Header';
import './styles/profile.scss'

const Profile = () => {

    const [profile, setProfile] = useState({})
    const navigate = useNavigate();
    const {user} = useSelector(state => state);
    const { userId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod(`http://localhost:9900/profile/${userId}`, token)
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        if(!user.isLogged) {
            navigate('/')
        }
    },[user.isLogged])

    console.log();

    return (
        <>
            <Header />
            <h1>Profil</h1>
            {/* {profile.map((info, i) => {
                <div key={i} >{info.firstName} {info.lastName}</div>
            })} */}
        </>
    )

}

export default Profile;