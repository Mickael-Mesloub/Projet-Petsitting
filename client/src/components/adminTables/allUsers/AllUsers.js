import { useState, useEffect } from "react";
import { getMethod } from "../../../helpers/fetch";
import "./styles.scss";

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/users`)
      .then((data) => setUsers(data.users))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="allUsers-main">
      <h3>Utilisateurs</h3>
      {users && users.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminAllUsers;
