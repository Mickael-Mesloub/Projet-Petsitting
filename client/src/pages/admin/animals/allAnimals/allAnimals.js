import { getMethod } from "../../../../helpers/fetch.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";
import { animalSize } from "../../../../helpers/utils.js";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/animals`)
      .then((data) => {
        console.log(data.animals);
        if (!user.isAdmin) {
          navigate("/");
          setAnimals(data.animals);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(visible);
  }, [visible]);

  const displayImages = () => {
    setVisible(!visible);
  };

  return (
    <main>
      <AdminLinks />
      <h2>Animaux</h2>
      {animals.length === 0 ? (
        <div>Aucun animal trouvé</div>
      ) : (
        <div>
          {animals.map((animal, i) => (
            <div key={i}>
              <div>Nom : {animal.name}</div>
              <div>Présentation : {animal.description}</div>
              <div>Taille : {animalSize(animal.size)} </div>
              {animal.images.length === 0 ? (
                <div>Aucune image téléchargé pour cet animal</div>
              ) : (
                <>
                  <button onClick={displayImages}>
                    {visible ? "Masquer" : "Afficher"} images
                  </button>

                  {visible && (
                    <div>
                      {animal.images.map((image, i) => (
                        <Link key={i} to={`http://localhost:9900/${image}`}>
                          ${image}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Animals;
