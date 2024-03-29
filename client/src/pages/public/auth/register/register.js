import { useState } from "react";
import { postFormData } from "../../../../helpers/fetch";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
import "./styles.scss";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (firstName && lastName && phone && email && password) {
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
    }

    for (const i of avatar) {
      formData.append("file", i);
    }

    postFormData(`${process.env.REACT_APP_API_URL}/register`, formData)
      .then(() => {
        toastSuccess("Compte créé 🎉 !");
        navigate("/login");
      })
      .catch((error) => {
        toastError("Création échouée ❌");
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Rubieland 🐶 - S'inscrire</title>
        <meta name="description" content="S'inscrire à Rubieland" />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, inscription, compte"
        />
      </Helmet>
      <main className="registerPage-main">
        <h2>Inscrivez-vous</h2>
        <form
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-inputs">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              required
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
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <input
              type="password"
              name="password"
              required
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
              required
              onChange={(e) => setAvatar(e.target.files)}
            />
          </div>
          <div className="cancel-confirm-buttons">
            <Link to="/" className="cancel">
              Retour
            </Link>
            <input className="confirm" type="submit" value="M'inscrire" />
          </div>
        </form>
      </main>
    </>
  );
};

export default Register;
