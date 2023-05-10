import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import AllAnimals from "../../../../components/adminTables/allAnimals/AllAnimals";
import "./styles.scss";

const Animals = () => {
  return (
      <main>
          <AdminLinks />
          <AllAnimals /> 
      </main>
  );
};

export default Animals;
