import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles.scss";

const Profile = () => {
  const [profile, setProfile] = useState([]);

  const { user } = useSelector((state) => state);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);

    if (user && user._id === userId) {
      getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, userId]);

  return (
    <main className="profilePage-main">
      {profile && profile.user && (
        <div className="profile-container">
          <h2>Mon profil</h2>
          <div className="user-avatar">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${profile.user.avatar}`}
              alt={`${profile.user.firstName}_${profile.user.lastName}_avatar`}
            />
          </div>
          <div className="user-information">
            <p>Prénom : {profile.user.firstName}</p>
            <p>Nom : {profile.user.lastName}</p>
            <p>Téléphone : {profile.user.phone}</p>
            <p>Email : {profile.user.email}</p>
          </div>
          <div className="update-profile-link-container">
            <Link
              to={`/profile/${userId}/update-profile`}
              className="update-profile-link"
            >
              Modifier mon profil ✏️
            </Link>
          </div>
          {/* <div>
            <Link to={`/profile/${userId}/animals`}>Mes animaux</Link>
          </div> */}
        </div>
      )}
    </main>
  );
};

export default Profile;
