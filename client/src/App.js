import "./index.scss";
import "./assets/styles/forms.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loginUser } from "./store/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMethod } from "./helpers/fetch";
import {
  publicRoutes,
  userProfileRoutes,
  adminRoutes,
  authRoutes,
} from "./routes/routes";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";
import { AdminMiddleware } from "./middlewares/admin/AdminMiddleware";
import { ProfileMiddleware } from "./middlewares/userMiddleware/ProfileMiddleware";
import { Toast } from "./components/toast/Toast";

const App = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  // VERIFY USER JWT TO KEEP USER LOGGED IN

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !user.isLogged) {
      getMethod(`${process.env.REACT_APP_API_URL}/verify-token`)
        .then((data) => {
          dispatch(loginUser(data.user));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <Toast />
      <SecondaryMenu />
      <Header />
      <Navbar />
      <Routes>
        {publicRoutes.map((route, i) => (
          <Route
            path={route.path}
            element={route.element}
            key={i}
            exact={true}
          />
        ))}

        {adminRoutes.map((route, i) => (
          <Route
            path={route.path}
            element={<AdminMiddleware>{route.element}</AdminMiddleware>}
            key={i}
            exact={true}
          />
        ))}

        {userProfileRoutes.map((route, i) => (
          <Route
            path={route.path}
            element={<ProfileMiddleware>{route.element}</ProfileMiddleware>}
            key={i}
            exact={true}
          />
        ))}

        {authRoutes.map((route, i) => (
          <Route
            path={route.path}
            element={route.element}
            key={i}
            exact={true}
          />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
