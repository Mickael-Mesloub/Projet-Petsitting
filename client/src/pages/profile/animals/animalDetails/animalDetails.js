import { getMethod, deleteMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdCreate } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { capitalizeText } from "../../../../helpers/utils";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import "./styles.scss";

const Animal = () => {
  const [animal, setAnimal] = useState({});
  const [animalNameCapitalized, setAnimalNameCapitalized] = useState("");

  const { animalId } = useParams();
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMethod(`${process.env.REACT_APP_API_URL}/profile/animals/${animalId}`)
        .then((data) => {
          if (user._id && user._id !== data.animal.owner) {
            toastError(
              "Vous n'êtes pas autorisé(e) à consulter cette page! ⛔"
            );
            navigate("/");
          } else {
            setAnimal(data.animal);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

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
    <>
      <Helmet>
        <title>
          Rubieland 🐶 -{" "}
          {animal ? `Mes toutous - ${animal.name}` : "Mes toutous"}{" "}
        </title>
        <meta
          name="description"
          content={
            animal
              ? `Tout ce qu'il faut savoir sur ${animal.name}`
              : "Profil de mon toutou"
          }
        />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, profil, informations, détails"
        />
      </Helmet>
      <main className="animal-main">
        {user._id && user._id === animal.owner ? (
          <div className="animal-container">
            <h2>{animalNameCapitalized}</h2>
            <div className="animal-description"> {animal.description} </div>
            <div className="animal-images-container">
              {animal.images &&
                animal.images.length === 1 &&
                animal.images.map((image, i) => (
                  <div key={i} className="animal-image">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${image}`}
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
                            src={`${process.env.REACT_APP_API_URL}/${image}`}
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
                      `${process.env.REACT_APP_API_URL}/profile/animals/${animalId}`
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
            <div className="link-button">
              <Link to="/profile" className="link-to-page">
                Retourner au profil
              </Link>
            </div>
          </div>
        ) : (
          <h2>Chargement...</h2>
        )}
      </main>
    </>
  );
};

export default Animal;
