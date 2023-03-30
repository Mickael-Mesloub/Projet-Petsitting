import Header from "../../../../components/header/Header.js";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod } from "../../../../helpers/fetch";
import './styles.scss'

const AdminAllUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/users`)
            .then((data) => setUsers(data.users))
            .catch((error) => console.log(error))
    }, [])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Utilisateurs</h1>
            {users &&
                <main>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Prénom</th>
                                <th>Nom de famille</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Avatar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) =>
                                <tr key={i}>
                                    <td><Link to={`${process.env.REACT_APP_BACKEND_URL}/admin/users/${user._id}`}>{user._id}</Link></td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.avatar}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            }
        </>
    )
}

export default AdminAllUsers;