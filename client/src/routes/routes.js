// public
import Home from "../pages/public/home/home";
import Register from "../pages/public/auth/register/register";
import Login from "../pages/public/auth/login/login";
import Logout from "../pages/public/auth/logout/logout";
import PublicNews from "../pages/public/news/allNews/news";
import PublicNewsDetails from "../pages/public/news/newsArticleDetails/newsArticleDetails";
import PublicServices from "../pages/public/services/services";
import NotFoundPage from "../pages/public/notFound/notFound";
import Contact from "../pages/public/contact/contact";
import Booking from "../pages/public/createBooking/createBooking";

// profile
import Profile from "../pages/profile/user/userDetails/userDetails";
import Animal from "../pages/profile/animals/animalDetails/animalDetails";
import UpdateProfile from "../pages/profile/user/updateUserDetails/updateUserDetails";
import CreateAnimal from "../pages/profile/animals/createAnimal/createAnimal";
import UpdateAnimal from "../pages/profile/animals/updateAnimal/updateAnimal";
import GetBooking from "../pages/profile/bookings/allUserBookings/allUserBookings";

//admin
import AdminHome from "../pages/admin/home/home";
import Animals from "../pages/admin/animals/allAnimals/allAnimals";
import AdminServices from "../pages/admin/services/allServices/allServices";
import ServiceDetails from "../pages/admin/services/serviceDetails/serviceDetails";
import UpdateService from "../pages/admin/services/updateService/updateService";
import CreateService from "../pages/admin/services/createService/createService";
import AdminNews from "../pages/admin/news/allNewsArticles/allNewsArticles";
import AdminNewsDetails from "../pages/admin/news/newsArticleDetails/newsArticleDetails";
import CreateArticle from "../pages/admin/news/createNewsArticle/createNewsArticle";
import UpdateArticle from "../pages/admin/news/updateNewsArticle/updateNewsArticle";
import AllUsers from "../pages/admin/users/allUsers/allUsers";
import UserDetails from "../pages/admin/users/userDetails/userDetails";
import Bookings from "../pages/admin/bookings/allBookings/allBookings";

// PUBLIC
export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/news", element: <PublicNews /> },
  { path: "/news/:articleId", element: <PublicNewsDetails /> },
  { path: "/services", element: <PublicServices /> },
  { path: "/contact", element: <Contact /> },
  { path: "/booking", element: <Booking /> },
  { path: "*", element: <NotFoundPage /> },
];

// PROFILE
export const profileRoutes = [
  { path: `/profile`, element: <Profile /> },
  { path: `/profile/update-profile`, element: <UpdateProfile /> },
  { path: `/profile/create-animal`, element: <CreateAnimal /> },
  { path: `/profile/animals/:animalId`, element: <Animal /> },
  {
    path: `/profile/animals/:animalId/update-animal`,
    element: <UpdateAnimal />,
  },
  { path: `/profile/bookings/:bookingId`, element: <GetBooking /> },
];

// ADMIN
export const adminRoutes = [
  { path: "/admin", element: <AdminHome /> },
  { path: "/admin/services", element: <AdminServices /> },
  { path: "/admin/services/create-service", element: <CreateService /> },
  { path: "/admin/services/:serviceId", element: <ServiceDetails /> },
  {
    path: "/admin/services/:serviceId/update-service",
    element: <UpdateService />,
  },
  { path: "/admin/news", element: <AdminNews /> },
  { path: "/admin/news/:articleId", element: <AdminNewsDetails /> },
  { path: "/admin/news/create-article", element: <CreateArticle /> },
  { path: "/admin/news/:articleId/update-article", element: <UpdateArticle /> },
  { path: "/admin/users", element: <AllUsers /> },
  { path: "/admin/users/:userId", element: <UserDetails /> },
  { path: "/admin/animals", element: <Animals /> },
  { path: "/admin/bookings", element: <Bookings /> },
];

// AUTH
export const authRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
];
