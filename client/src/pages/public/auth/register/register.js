import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFormData, postMethod } from "../../../../helpers/fetch";
import "./styles.scss";

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

    if (firstName && lastName && phone && email && password) {
      formData.append("firstName", firstName);
      console.log(formData.get("firstName"));

      formData.append("lastName", lastName);
      console.log(formData.get("lastName"));

      formData.append("phone", phone);
      console.log(formData.get("phone"));

      formData.append("email", email);
      console.log(formData.get("email"));

      formData.append("password", password);
      console.log(formData.get("password"));
    }

    if (avatar && avatar.length > 0) {
      for (const image of avatar) {
        formData.append("avatar", image);
      }
    } else {
      formData.append("avatar", "");
    }
    console.log(formData.get("avatar"));

    for (const [key, value] of formData) {
      console.log(key + " " + value);
    }

    postFormData(`${process.env.REACT_APP_BACKEND_URL}/register`, formData)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  //   useEffect(() => {
  //     console.log(
  //       `${firstName}-${lastName}-${email}-${phone}-${password}-${avatar}`
  //     );
  //   }, [firstName, lastName, email, phone, password, avatar]);

  return (
    <main className="registerPage-main">
      <h2>Inscrivez-vous</h2>
      <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
        <div className="form-inputs">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-inputs">
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone (format XX XX XX XX XX)"
            pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
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
        <div className="form-inputs file-input">
          <label htmlFor="file">Choisissez un avatar : </label>
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
    </main>
  );
};

export default Register;
