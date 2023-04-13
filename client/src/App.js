import "./index.scss";
import "./assets/styles/forms.scss";
import { BrowserRouter } from "react-router-dom";
import { loginUser } from "./store/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMethod } from "./helpers/fetch";
import Navigation from "./routes/routes";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SecondaryMenu from "./components/secondary-menu/SecondaryMenu";

const App = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  // VERIFY USER JWT TO KEEP USER LOGGED IN

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !user.isLogged) {
      getMethod(`${process.env.REACT_APP_BACKEND_URL}/verify-token`)
        .then((data) => {
          console.log(data);
          dispatch(loginUser(data.user));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <BrowserRouter>
      <SecondaryMenu />
      <Header />
      <Navbar />
      <Navigation />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
