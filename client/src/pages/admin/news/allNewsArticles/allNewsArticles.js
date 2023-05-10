import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllArticles from "../../../../components/adminTables/allNewsArticles/AllNewsArticles";
import "./styles.scss";

const AdminNews = () => {
  return (
      <main>
          <AdminLinks />
          <AllArticles /> 
      </main>
  );
};

export default AdminNews;
