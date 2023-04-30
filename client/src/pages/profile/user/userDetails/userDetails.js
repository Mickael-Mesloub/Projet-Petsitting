import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAlternateEmail, MdCall, MdCreate } from "react-icons/md";
import { capitalizeUsername } from "../../../../helpers/utils";
import "./styles.scss";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [userFirstNameCapitalized, setUserFirstNameCapitalized] = useState("");
  const [userLastNameCapitalized, setUserLastNameCapitalized] = useState("");

  const { user } = useSelector((state) => state);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id === userId) {
      getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/login");
    }
  }, [user, userId]);

  useEffect(() => {
    capitalizeUsername(user, user.firstName).then((username) =>
      setUserFirstNameCapitalized(username)
    );
    capitalizeUsername(user, user.lastName).then((username) =>
      setUserLastNameCapitalized(username)
    );
  }, [user]);

  return (
    <main className="profilePage-main">
      <div className="profile-container">
        <h2>Mon profil</h2>
        {profile && profile.user && (
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
                to={`/profile/${userId}/update-profile`}
                className="update-profile-link"
              >
                <MdCreate />
              </Link>
            </div>
            {/* <div>
            <Link to={`/profile/${userId}/animals`}>Mes animaux</Link>
          </div> */}
          </div>
        )}
      </div>
      <div className="animals-container">
        <h2>Mes animaux :</h2>
        {profile.animals && profile.animals.length > 0 ? (
          <>
            <div className="animals-cards">
              {profile.animals.map((animal, i) => (
                <div key={i} className="animal-card">
                  <div className="animals-images-box">
                    {animal.images && animal.images.length >= 1 ? (
                      <div className="animal-image">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/${animal.images[0]}`}
                          alt={`${animal.name}_${i}`}
                        />
                      </div>
                    ) : (
                      <div>Aucune image téléchargée</div>
                    )}
                  </div>
                  <div>
                    <Link to={`/profile/${userId}/animals/${animal._id}`}>
                      {animal.name}
                    </Link>{" "}
                  </div>
                </div>
              ))}
              <Link to={`/profile/${userId}/create-animal`}>
                Ajouter un nouvel animal
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>Aucun animal</p>
          </>
        )}
      </div>
    </main>
  );
};

export default Profile;
