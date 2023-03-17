import './index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loginUser } from './store/slices/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/publicPages/Home'
import Register from './pages/publicPages/authPages/Register';
import Login from './pages/publicPages/authPages/Login';
import PublicNews from './pages/publicPages/News';
import PublicServices from './pages/publicPages/Services';
import Profile from './pages/profilePages/Profile';
import CreateAnimal from './pages/profilePages/CreateAnimal';
import AdminHome from './pages/adminPages/AdminHome';
import AdminServices from './pages/adminPages/servicesPages/Services';
import AdminNews from './pages/adminPages/newsPages/News';
import Users from './pages/adminPages/usersPages/Users';
import Animals from './pages/adminPages/animalPages/Animals';
import verifyToken from './components/auth/VerifyToken';

const App = () => {

    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if(token && !user.logged) {
            verifyToken('http://localhost:9900/verify-token', token, dispatch, loginUser);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Home/>} />
                <Route path="/news" element={<PublicNews/>} />
                <Route path="/services" element={<PublicServices/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/profile/create-animal" element={<CreateAnimal/>} />

                {/* ADMIN */}
                <Route path="/admin" element={<AdminHome/>} />
                <Route path="/admin/services" element={<AdminServices/>} />
                <Route path="/admin/news" element={<AdminNews/>} />
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
