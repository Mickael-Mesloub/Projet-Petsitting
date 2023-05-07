import AdminLinks from "../../../components/adminLinks/AdminLinks";
import AllUsers from "../../../components/adminTables/allUsers/AllUsers";
import AllServices from "../../../components/adminTables/allServices/AllServices";
import AllAnimals from "../../../components/adminTables/allAnimals/AllAnimals";
import AllArticles from "../../../components/adminTables/allNewsArticles/AllNewsArticles";
import "./styles.scss";

const AdminDashboard = () => {
  return (
    <main>
      <h2>Dashboard</h2>
      <AdminLinks />
      <AllUsers />
      <AllAnimals />
      <AllArticles />
      <AllServices />
    </main>
  );
};

export default AdminDashboard;
