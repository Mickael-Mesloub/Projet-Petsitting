import { getMethod, deleteMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdCreate } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import { toastSuccess } from "../../../../components/toast/Toast";
import { capitalizeText } from "../../../../helpers/utils";
import "./styles.scss";

const Animal = () => {
  const [animal, setAnimal] = useState({});
  const [animalNameCapitalized, setAnimalNameCapitalized] = useState("");

  const { animalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (animal) {
      getMethod(
        `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}`
      )
        .then((data) => {
          setAnimal(data.animal);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (animal) {
      capitalizeText(animal.name).then((newName) =>
        setAnimalNameCapitalized(newName)
      );
    }
  }, [animal]);

  const settings = {
    infinite: true,
    showThumbs: false,
    showStatus: false,
    autoPlay: true,
    infiniteLoop: true,
    interval: 3000,
  };

  return (
    <main className="animal-main">
      {animal && (
        <div className="animal-container">
          <h2>{animalNameCapitalized}</h2>
          <div className="animal-description"> {animal.description} </div>
          <div className="animal-images-container">
            {animal.images &&
              animal.images.length === 1 &&
              animal.images.map((image, i) => (
                <div key={i} className="animal-image">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                    alt={`${animal.name}_${i}`}
                  />
                </div>
              ))}
            {animal.images && animal.images.length > 1 && (
              <div className="carousel">
                <div className="carousel-slider">
                  <Carousel {...settings}>
                    {animal.images.map((image, i) => (
                      <div key={i} className="carousel-slide">
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                          alt={`${i}_${animal.title}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            )}
            {animal.images && animal.images.length === 0 && (
              <p>Aucune image téléchargée.</p>
            )}
          </div>

          <div className="delete-icon-container">
            <div
              className="delete-icon"
              onClick={() => {
                if (
                  window.confirm(
                    "Êtes-vous sûr(e) de vouloir supprimer cet animal ?"
                  )
                ) {
                  deleteMethod(
                    `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}`
                  ).then(() => {
                    toastSuccess("Supprimé avec succès !");
                    navigate("/profile");
                  });
                }
              }}
            >
              <MdDelete />
            </div>
          </div>
          <div className="update-icon-container">
            <Link
              to={`/profile/animals/${animalId}/update-animal`}
              className="update-icon"
            >
              <MdCreate />
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Animal;
