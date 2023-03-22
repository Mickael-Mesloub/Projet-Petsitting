import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import verifyToken from '../../helpers/VerifyToken';
import Header from '../../components/Header'
import './styles/adminHome.scss'
import AdminLinks from '../../components/AdminLinks';

const AdminHome = () => {

    const {user} = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(!user && user.isAdmin) {
            navigate('/')
        }
    })

    // <Route path="/admin" element={<AdminHome/>} />
    //             <Route path="/admin/services" element={<AdminServices/>} />
    //             <Route path="/admin/services/create-service" element={<CreateService/>} />
    //             
    //             <Route path="/admin/news" element={<AdminNews/>} />
    //             <Route path="/admin/news/create-article" element={<CreateNews/>} />
    //             <Route path="/admin/users" element={<Users/>} />
    //             <Route path="/admin/animals" element={<Animals/>} />
    

    return (
        <>  
            <Header />
            <AdminLinks />
            <h1>AdminHome</h1>
            
        </>
    )
}

export default AdminHome;