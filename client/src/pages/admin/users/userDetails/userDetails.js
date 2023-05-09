import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod } from "../../../../helpers/fetch";
import { capitalizeText } from "../../../../helpers/utils.js";

const AdminUserDetails = () => {
  const [user, setUser] = useState({});
  const [userFirstNameCapitalized, setUserFirstNameCapitalized] = useState("");
  const [userLastNameCapitalized, setUserLastNameCapitalized] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${userId}`)
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (user.user) {
      capitalizeText(user, user.user.firstName).then((username) =>
        setUserFirstNameCapitalized(username)
      );
      capitalizeText(user, user.user.lastName).then((username) =>
        setUserLastNameCapitalized(username)
      );
    }
  }, [user.user]);

  return (
    <main>
      <h2>Profil</h2>
      {user && user.user && (
        <div className="user-profile">
          <h2>
            {userFirstNameCapitalized} {userLastNameCapitalized}
          </h2>
        </div>
      )}
    </main>
  );
};

export default AdminUserDetails;
