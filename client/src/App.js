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
import UserAnimals from './pages/profilePages/AllUserAnimals'
import Animal from './pages/profilePages/Animal';
import UpdateProfile from './pages/profilePages/UpdateProfile';
import CreateAnimal from './pages/profilePages/CreateAnimal';
import AdminHome from './pages/adminPages/AdminHome';
import AdminServices from './pages/adminPages/servicesPages/adminServices';
import AdminServiceDetails from './pages/adminPages/servicesPages/adminServiceDetails';
import CreateService from './pages/adminPages/servicesPages/createService';
import AdminNews from './pages/adminPages/newsPages/adminNews';
import AdminNewsDetails from './pages/adminPages/newsPages/adminNewsDetails';
import CreateArticle from './pages/adminPages/newsPages/createArticle';
import Users from './pages/adminPages/usersPages/adminUsers';
import Animals from './pages/adminPages/animalPages/adminAnimals';
import UpdateAnimal from './pages/profilePages/UpdateAnimal';
import NotFoundPage from './pages/publicPages/NotFound';
import Contact from './pages/publicPages/Contact';
import Booking from './pages/publicPages/BookingPage';
import Bookings from './pages/adminPages/bookingPages/Bookings';
import UpdateArticle from './pages/adminPages/newsPages/updateNews';
import GetBooking from './pages/profilePages/Booking'
import { getMethod } from './helpers/fetch';

const App = () => {

    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if(token && !user.isLogged) {
            getMethod('http://localhost:9900/verify-token')
                .then((data) => {dispatch(loginUser(data.user))})
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
                <Route path="/contact" element={<Contact />} />
                <Route path="/:userId/booking" element={<Booking />} />

                {/* PROFILE */}
                <Route path={`/profile/:userId`} element={<Profile/>} />
                <Route path={`/profile/:userId/update-profile`} element={<UpdateProfile/>} />
                <Route path={`/profile/:userId/create-animal`} element={<CreateAnimal/>} />
                <Route path={`/profile/:userId/animals`} element={<UserAnimals/>} />
                <Route path={`/profile/:userId/animals/:animalId`} element={<Animal/>} />
                <Route path={`/profile/:userId/animals/:animalId/update-animal`} element={<UpdateAnimal/>} />
                <Route path={`/profile/:userId/bookings/:bookingId`} element={<GetBooking/>} />

                {/* ADMIN */}
                <Route path="/admin" element={<AdminHome/>} />
                <Route path="/admin/services" element={<AdminServices/>} />
                <Route path="/admin/services/create-service" element={<CreateService/>} />
                <Route path="/admin/services/:serviceId" element={<AdminServiceDetails/>} />
                <Route path="/admin/news" element={<AdminNews/>} />
                <Route path="/admin/news/:articleId" element={<AdminNewsDetails/>} />
                <Route path="/admin/news/create-article" element={<CreateArticle/>} />
                <Route path="/admin/news/:articleId/update-article" element={<UpdateArticle/>} />
                <Route path="/admin/users" element={<Users/>} />
                <Route path="/admin/animals" element={<Animals/>} />
                <Route path="/admin/bookings" element={<Bookings />} />

                {/* AUTH */}
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />

                {/* NOT FOUND */}
                <Route path="*" element={<NotFoundPage />} />

            </Routes>        
        </BrowserRouter>
    )   
}

export default App;
