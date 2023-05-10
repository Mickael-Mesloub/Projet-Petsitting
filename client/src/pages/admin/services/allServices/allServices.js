import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllServices from "../../../../components/adminTables/allServices/AllServices";
import "./styles.scss";

const AdminServices = () => {
  return (
      <main>
          <AdminLinks />
          <AllServices /> 
      </main>
  );
};

export default AdminServices;
