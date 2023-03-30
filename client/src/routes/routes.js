import { Routes, Route } from 'react-router-dom'

// public
import Home from '../pages/public/home/home';
import Register from '../pages/public/auth/register/register';
import Login from '../pages/public/auth/login/login';
import Logout from '../pages/public/auth/logout/logout';
import PublicNews from '../pages/public/news/news';
import PublicServices from '../pages/public/services/services';
import NotFoundPage from '../pages/public/notFound/notFound';
import Contact from '../pages/public/contact/contact';
import Booking from '../pages/public/createBooking/createBooking';

// profile
import Profile from '../pages/profile/user/userDetails/userDetails';
import UserAnimals from '../pages/profile/animals/allUserAnimals/allUserAnimals'
import Animal from '../pages/profile/animals/animalDetails/animalDetails';
import UpdateProfile from '../pages/profile/user/updateUserDetails/updateUserDetails';
import CreateAnimal from '../pages/profile/animals/createAnimal/createAnimal';
import UpdateAnimal from '../pages/profile/animals/updateAnimal/updateAnimal';
import GetBooking from '../pages/profile/bookings/allUserBookings/allUserBookings'

//admin
import AdminHome from '../pages/admin/home/home';
import Animals from '../pages/admin/animals/allAnimals/allAnimals';
import AdminServices from '../pages/admin/services/allServices/allServices';
import ServiceDetails from '../pages/admin/services/serviceDetails/serviceDetails';
import UpdateService from '../pages/admin/services/updateService/updateService';
import CreateService from '../pages/admin/services/createService/createService';
import AdminNews from '../pages/admin/news/allNewsArticles/allNewsArticles';
import AdminNewsDetails from '../pages/admin/news/newsArticleDetails/newsArticleDetails';
import CreateArticle from '../pages/admin/news/createNewsArticle/createNewsArticle';
import UpdateArticle from '../pages/admin/news/updateNewsArticle/updateNewsArticle';
import AllUsers from '../pages/admin/users/allUsers/allUsers';
import Bookings from '../pages/admin/bookings/allBookings/allBookings';

const Navigation = () => {

    return (
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<PublicNews />} />
            <Route path="/services" element={<PublicServices />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:userId/booking" element={<Booking />} />

            {/* PROFILE */}
            <Route path={`/profile/:userId`} element={<Profile />} />
            <Route path={`/profile/:userId/update-profile`} element={<UpdateProfile />} />
            <Route path={`/profile/:userId/create-animal`} element={<CreateAnimal />} />
            <Route path={`/profile/:userId/animals`} element={<UserAnimals />} />
            <Route path={`/profile/:userId/animals/:animalId`} element={<Animal />} />
            <Route path={`/profile/:userId/animals/:animalId/update-animal`} element={<UpdateAnimal />} />
            <Route path={`/profile/:userId/bookings/:bookingId`} element={<GetBooking />} />

            {/* ADMIN */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/services/create-service" element={<CreateService />} />
            <Route path="/admin/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/admin/services/:serviceId/update-service" element={<UpdateService />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/news/:articleId" element={<AdminNewsDetails />} />
            <Route path="/admin/news/create-article" element={<CreateArticle />} />
            <Route path="/admin/news/:articleId/update-article" element={<UpdateArticle />} />
            <Route path="/admin/users" element={<AllUsers />} />
            <Route path="/admin/animals" element={<Animals />} />
            <Route path="/admin/bookings" element={<Bookings />} />

            {/* AUTH */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* NOT FOUND */}
            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}

export default Navigation;