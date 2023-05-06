import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../../store/slices/user/userSlice";
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

  useEffect(() => {
    console.log(profile.user);
  }, [profile.user]);

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

    console.log(formData);
    putFormData(
      `${process.env.REACT_APP_BACKEND_URL}/profile/update-profile`,
      formData
    )
      .then((data) => {
        dispatch(loginUser(data.user));
        navigate(`/profile`);
      })

      .then((error) => console.log(error));
  };

  useEffect(() => {
    console.log(password);
  }, [password]);

  return (
    <main className="update-profile-main">
      {profile.user && (
        <>
          <h2>Modifier le profil</h2>
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone (format XX XX XX XX XX)"
                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-inputs file-input">
              <label htmlFor="file">Changer d'avatar : </label>
              <input
                type="file"
                name="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setAvatar(e.target.files)}
              />
            </div>
            <input type="submit" name="submit" value="Modifier" />
          </form>
        </>
      )}
    </main>
  );
};

export default UpdateProfile;
