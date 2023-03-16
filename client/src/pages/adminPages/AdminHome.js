import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyToken from '../../components/auth/VerifyToken';

const AdminHome = () => {

    const {user} = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(!user.isAdmin) {
            navigate('/')
        }
    })
    

    return (
        <>
            <h1>AdminHome</h1>
        </>
    )

}

export default AdminHome;