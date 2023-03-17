import { getMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from './../../components/Header';
import './styles/profile.scss'

const Profile = () => {

    const [profile, setProfile] = useState({})
    const navigate = useNavigate();
    const {user} = useSelector(state => state);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod('http://localhost:9900/profile', token)
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        if(!user.isLogged) {
            navigate('/')
        }
    },[])

    return (
        <>
            <Header />
            <h1>Profil</h1>

        </>
    )

}

export default Profile;