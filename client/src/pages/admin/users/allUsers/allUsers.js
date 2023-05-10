import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllUsers from "../../../../components/adminTables/allUsers/AllUsers";
import "./styles.scss";

const AdminAllUsers = () => {
  return (
      <main>
          <AdminLinks />
          <AllUsers /> 
      </main>
  );
};

export default AdminAllUsers;
