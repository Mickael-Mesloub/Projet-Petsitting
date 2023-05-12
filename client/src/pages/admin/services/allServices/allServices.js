import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllServices from "../../../../components/adminTables/allServices/AllServices";
import { Helmet } from "react-helmet";
import "./styles.scss";

const AdminServices = () => {
  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Toutes les prestations</title>
          <meta 
              name="description" 
              content="Toutes les prestations créées"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main>
          <AdminLinks />
          <AllServices /> 
      </main>
    </>
  );
};

export default AdminServices;
