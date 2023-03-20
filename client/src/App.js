import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loginUser } from './store/slices/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Home from './pages/publicPages/Home';
import Register from './pages/publicPages/authPages/Register';
import Login from './pages/publicPages/authPages/Login';
import PublicNews from './pages/publicPages/News';
import PublicServices from './pages/publicPages/Services';
import Profile from './pages/profilePages/Profile';
import CreateAnimal from './pages/profilePages/CreateAnimal';
import AdminHome from './pages/adminPages/AdminHome';
import AdminServices from './pages/adminPages/servicesPages/adminServices';
import AdminServiceDetails from './pages/adminPages/servicesPages/adminServiceDetails';
import CreateService from './pages/adminPages/servicesPages/createService';
import AdminNews from './pages/adminPages/newsPages/adminNews';
import CreateNews from './pages/adminPages/newsPages/createNews';
import Users from './pages/adminPages/usersPages/adminUsers';
import Animals from './pages/adminPages/animalPages/adminAnimals';
import verifyToken from './helpers/VerifyToken';

const App = () => {

    const {user} = useSelector(state => state);
    const [userId, setUserId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user.isLogged);
        const token = localStorage.getItem('jwt')
        if(token && !user.isLogged) {
            verifyToken('http://localhost:9900/verify-token', token)
                .then((data) => {
                    console.log(data.user);
                    dispatch(loginUser(data.user))
                    setUserId(data.user.id)
                })
                .catch((error) => console.log(error))        
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Home/>} />
                <Route path="/news" element={<PublicNews/>} />
                <Route path="/services" element={<PublicServices/>} />
                <Route path={`/profile/:userId`} element={<Profile/>} />
                <Route path={`/profile/:userId/create-animal`} element={<CreateAnimal/>} />

                {/* ADMIN */}
                <Route path="/admin" element={<AdminHome/>} />
                <Route path="/admin/services" element={<AdminServices/>} />
                <Route path="/admin/services/create-service" element={<CreateService/>} />
                <Route path="/admin/services/:id" element={<AdminServiceDetails/>} />
                <Route path="/admin/news" element={<AdminNews/>} />
                <Route path="/admin/news/create-article" element={<CreateNews/>} />
                <Route path="/admin/users" element={<Users/>} />
                <Route path="/admin/animals" element={<Animals/>} />

                {/* AUTH */}
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>        
        </BrowserRouter>
    )   
}

export default App;
