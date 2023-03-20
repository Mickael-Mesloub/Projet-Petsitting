import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AdminHome from '../adminPages/AdminHome';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import './styles/home.scss'

const Home = () => {

    const {user} = useSelector(state => state);

    return (
        <>  
            <Header/>
            <h1>Accueil</h1>            
        </>
    )
}

export default Home;