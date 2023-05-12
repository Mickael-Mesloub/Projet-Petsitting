import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllAnimals from "../../../../components/adminTables/allAnimals/AllAnimals";
import { Helmet } from "react-helmet";
import "./styles.scss";

const Animals = () => {
  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Tous les toutous</title>
          <meta 
              name="description" 
              content="Tous les toutous créés par les utilisateurs du site"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main>
          <AdminLinks />
          <AllAnimals /> 
      </main>
    </>
  );
};

export default Animals;
