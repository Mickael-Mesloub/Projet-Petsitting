// import '../assets/styles/logPages.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/header/Header.js";
import { postFormData } from "../../../../helpers/fetch";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState([]);

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar[0]);

    postFormData(`${process.env.REACT_APP_BACKEND_URL}/register`, formData)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>Inscrivez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-form-inputs">
          <label htmlFor="firstName">Prénom : </label>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="lastName">Nom : </label>
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="phone">Téléphone : </label>
          <input
            type="tel"
            name="phone"
            placeholder="Format XX XX XX XX XX"
            pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="password">Mot de passe : </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="file">Avatar : </label>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setAvatar(e.target.files)}
          />
        </div>
        <input
          type="submit"
          name="submit"
          className="register-btn"
          value="M'inscrire"
        />
      </form>
    </>
  );
};

export default Register;
