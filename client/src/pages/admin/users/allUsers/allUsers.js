import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllUsers from "../../../../components/adminTables/allUsers/AllUsers";
import { Helmet } from "react-helmet";
import "./styles.scss";

const AdminAllUsers = () => {
  return (
     <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Tous les utilisateurs</title>
          <meta 
              name="description" 
              content="Tous les utilisateurs créés"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main>
          <AdminLinks />
          <AllUsers /> 
      </main>
    </>
  );
};

export default AdminAllUsers;
