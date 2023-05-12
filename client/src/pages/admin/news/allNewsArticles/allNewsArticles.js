import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllArticles from "../../../../components/adminTables/allNewsArticles/AllNewsArticles";
import { Helmet } from "react-helmet";
import "./styles.scss";

const AdminNews = () => {
  return (
     <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Tous les articles</title>
          <meta 
              name="description" 
              content="Tous les articles créés"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main>
          <AdminLinks />
          <AllArticles /> 
      </main>
    </>
  );
};

export default AdminNews;
