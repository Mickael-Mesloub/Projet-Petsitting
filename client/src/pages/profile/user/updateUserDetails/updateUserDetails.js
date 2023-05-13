import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../../store/slices/user/userSlice";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
import "./styles.scss";

const UpdateProfile = () => {
  const [profile, setProfile] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState([]);

  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile`)
        .then((data) => setProfile(data))
        .catch((error) => console.log(error));
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);

    for (const i of avatar) {
      formData.append("file", i);
    }

    putFormData(
      `${process.env.REACT_APP_BACKEND_URL}/profile/update-profile`,
      formData
    )
      .then((data) => {
        dispatch(loginUser(data.updatedUser));
        toastSuccess("Modifié avec succès 🎉");
        navigate(`/profile`);
      })
      .catch((error) => {
        toastError("Modification échouée ❌");
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Modifier mon profil</title>
          <meta 
              name="description" 
              content="Modifier les informations de l'utilisateur"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, modifier, profil, informations, détails" />
      </Helmet>
      <main className="update-profile-main">
        {profile.user && (
          <>
            <h2>Modifier le profil</h2>
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
            >
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone (format XX XX XX XX XX)"
                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-inputs file-input">
                <label htmlFor="file">Changer d'avatar : </label>
                <input
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setAvatar(e.target.files)}
                />
              </div>
              <div className="cancel-confirm-buttons">
            <Link to="/profile" className="cancel">Retour</Link>
            <input className="confirm" type="submit" value="Modifier" />
          </div>
            </form>
          </>
        )}
      </main>
    </>
  );
};

export default UpdateProfile;
