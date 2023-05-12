import { getMethod } from "../../../helpers/fetch.js";
import { useState, useEffect } from "react";
import "./styles.scss";

const Animals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/animals`)
      .then((data) => {
        setAnimals(data.animals);
      })
      .catch((error) => console.log(error));
  }, []);
  
  const convertSize = (size) => {
    switch(size) {
      case "small" : return "Petit";
      case "medium" : return "Moyen";
      case "large" : return "Grand";
      default : return "";
    }
  };

  return (
    <main className="allAnimals-main">
      <h3>Animaux</h3>
      {animals && animals.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Taille</th>
                <th>ID du propriétaire</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal, i) => (
                <tr key={i}>
                  <td>{animal._id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.description.substring(0, 30)}...</td>
                  <td>{convertSize(animal.size)}</td>
                  <td>{animal.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data">Aucun animal n'a été créé.</div>
      )}
    </main>
  );
};

export default Animals;
