import { getMethod, deleteMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "../allUserAnimals/styles.scss";

const Animal = () => {
  const [animal, setAnimal] = useState({});
  const [animalBookings, setAnimalBookings] = useState([]);
  const { userId, animalId } = useParams();

  useEffect(() => {
    getMethod(
      `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals/${animalId}`
    )
      .then((data) => {
        setAnimal(data.animal);
        setAnimalBookings(data.bookings);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(animalBookings);
  }, []);

  return (
    <main className="animal-main">
      {animal && (
        <div className="animal-container">
          <h2>{animal.name}</h2>
          <div className="animal-description">« {animal.description} »</div>
          <div className="animal-images-container">
            {animal.images && animal.images.length > 0 ? (
              animal.images.map((image, i) => (
                <div key={i} className="animal-image">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <div>Aucune image téléchargée</div>
            )}
          </div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Êtes-vous sûr(e) de vouloir supprimer cet animal ?"
                )
              ) {
                deleteMethod(
                  `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals/${animalId}`
                );
              }
            }}
          >
            Supprimer
          </button>
          <Link to={`/profile/${userId}/animals/${animalId}/update-animal`}>
            Modifier
          </Link>
        </div>
      )}
    </main>
  );
};

export default Animal;
