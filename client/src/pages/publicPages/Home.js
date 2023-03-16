import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import AdminHome from '../adminPages/AdminHome';
import { Link } from 'react-router-dom';

const Home = () => {

    const {user} = useSelector(state => state);

    return (
        <>
            <h1>Home</h1>
            {user.isAdmin && 
                <Link to="/admin">Admin</Link>
            }
            
        </>
    )
}

export default Home;