import AdminLinks from "../../../components/adminLinks/AdminLinks";
import AllUsers from "../../../components/adminTables/allUsers/AllUsers";
import AllServices from "../../../components/adminTables/allServices/AllServices";
import AllAnimals from "../../../components/adminTables/allAnimals/AllAnimals";
import AllArticles from "../../../components/adminTables/allNewsArticles/AllNewsArticles";
import { Helmet } from "react-helmet";
import "./styles.scss";

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Dashboard</title>
          <meta 
              name="description" 
              content="Dashboard de l'administrateur"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main>
        <h2>Dashboard</h2>
        <AdminLinks />
        <AllUsers />
        <AllAnimals />
        <AllArticles />
        <AllServices />
      </main>
    </>
  );
};

export default AdminDashboard;
