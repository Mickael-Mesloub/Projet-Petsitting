import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../store/slices/user/userSlice.js";
import { postMethod } from "../../../../helpers/fetch";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    postMethod(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      email,
      password,
    })
      .then((data) => {
        console.log(data);
        dispatch(loginUser(data.user));
        localStorage.setItem("jwt", data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="loginPage-main">
      <h2>Connectez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          name="submit"
          className="login-btn"
          value="Connexion"
        />
      </form>
    </main>
  );
};

export default Login;
