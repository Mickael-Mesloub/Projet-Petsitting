import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAlternateEmail, MdCall, MdCreate } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { capitalizeText } from "../../../../helpers/utils";
import Tooltip from "../../../../components/tooltip/Tooltip";
import "./styles.scss";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [userFirstNameCapitalized, setUserFirstNameCapitalized] = useState("");
  const [userLastNameCapitalized, setUserLastNameCapitalized] = useState("");
  const [animalNameCapitalized, setAnimalNameCapitalized] = useState("");

  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile`)
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (profile.user) {
      capitalizeText(profile.user.firstName).then((username) =>
        setUserFirstNameCapitalized(username)
      );
      capitalizeText(profile.user.lastName).then((username) =>
        setUserLastNameCapitalized(username)
      );
    }

    if (profile.animals) {
      for (const animal of profile.animals) {
        console.log(animal);
        capitalizeText(animal.name).then((newName) =>
          setAnimalNameCapitalized(newName)
        );
      }
    }
  }, [profile.user, profile.animals]);

  return (
    <main className="profilePage-main">
      <div className="profile-container">
        <h2>Mon profil ✨ </h2>
        {profile.user && profile.user._id === user._id && (
          <div className="profile-card">
            <div className="user-avatar">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${profile.user.avatar}`}
                alt={`${profile.user.firstName}_${profile.user.lastName}_avatar`}
              />
            </div>
            <h3>
              {userFirstNameCapitalized} {userLastNameCapitalized}
            </h3>
            <div className="user-information">
              <div className="phone">
                <p className="icon">
                  <MdCall />
                </p>
                <p className="phone-number">{profile.user.phone}</p>
              </div>
              <div className="email">
                <p className="icon">
                  <MdAlternateEmail />
                </p>
                <p className="email-address">{profile.user.email}</p>
              </div>
            </div>

            <div className="update-profile-link-container">
              <Link
                to={`/profile/update-profile`}
                className="update-profile-link"
              >
                <MdCreate />
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="animals-container">
        <h2>Mes toutous 🐶 :</h2>
        {profile.animals && profile.animals.length > 0 ? (
          <>
            <div className="animals-cards">
              {profile.animals.map((animal, i) => (
                <div
                  key={i}
                  className="animal-card"
                  onClick={() => navigate(`/profile/animals/${animal._id}`)}
                >
                  <div className="animal-name">
                    <h3>{animalNameCapitalized}</h3>
                  </div>

                  <div className="animal-images-box">
                    {animal.images && animal.images.length >= 1 ? (
                      <div className="animal-image" data-name={animal.name}>
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/${animal.images[0]}`}
                          alt={`${animal.name}_${i}`}
                        />
                      </div>
                    ) : (
                      <div>Aucune image téléchargée</div>
                    )}
                  </div>
                </div>
              ))}
              <div className="plus-icon-container">
                <Tooltip text={"Ajouter un animal"} className="tooltip">
                  <div
                    className="plus-icon"
                    onClick={() => navigate(`/profile/create-animal`)}
                  >
                    <BsPlus />
                  </div>
                </Tooltip>
              </div>
            </div>
          </>
        ) : (
          <div className="not-found">
            <p>
              Vous n'avez pas encore créé d'animal. Cliquez sur le bouton
              ci-dessous pour en créer un :{" "}
            </p>
            <div className="plus-icon-container">
              <Tooltip text={"Ajouter un animal"} className="tooltip">
                <div
                  className="plus-icon"
                  onClick={() => navigate(`/profile/create-animal`)}
                >
                  <BsPlus />
                </div>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
