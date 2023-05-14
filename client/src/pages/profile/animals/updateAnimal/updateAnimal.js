import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { toastError } from "../../../../components/toast/Toast";
import "./styles.scss";

const UpdateAnimal = () => {
  const [animal, setAnimal] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const { animalId } = useParams();

  useEffect(() => {
    if (user) {
      getMethod(
        `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}`
      )
        .then((data) => {
          if (user._id && user._id !== data.animal.owner) {
            toastError(
              "Vous n'êtes pas autorisé(e) à consulter cette page! ⛔"
            );
            navigate("/");
          } else {
            setAnimal(data.animal);
            setName(data.animal.name);
            setDescription(data.animal.description);
            setSize(data.animal.size);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Supprimer les images sélectionnées
    const formData = new FormData();
    for (const image of selectedImages) {
      formData.append("deleteImages[]", image);
    }
    putFormData(
      `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}/update-animal`,
      formData
    )
      .then((data) => setAnimal(data))
      .then(() => setSelectedImages([]))
      .then(() => {
        formData.append("name", name);
        formData.append("description", description);
        formData.append("size", size);
        if (images && images.length > 0) {
          for (const image of images) {
            formData.append("file", image);
          }
        }

        // Mettre à jour les autres données de l'animal
        putFormData(
          `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}/update-animal`,
          formData
        )
          .then(() => navigate(`/profile/animals/${animalId}`))
          .catch((error) => console.log(error));
      });
  };

  return (
    <>
      <Helmet>
        <title>
          Rubieland 🐶 -{" "}
          {animal
            ? `Modifier les informations de ${animal.name}`
            : "Modifier les informations d'un toutou"}{" "}
        </title>
        <meta
          name="description"
          content={
            animal
              ? `Modifier les informations de  ${animal.name}`
              : "Modifier les informations d'un toutou"
          }
        />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, modifier, profil, informations, détails"
        />
      </Helmet>
      <main className="update-animal-main">
        {user._id && user._id === animal.owner ? (
          <>
            <h2>Modifier les infos de mon toutou</h2>
            <form className="update-animal-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Nom du toutou : </label>
              <input
                defaultValue={name}
                type="text"
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
              <label htmlFor="description">Décrivez-nous votre toutou : </label>
              <textarea
                defaultValue={description}
                name="description"
                rows="10"
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <label className="size-label" htmlFor="size">
                Taille :
              </label>
              <select
                name="size"
                onChange={(event) => setSize(event.target.value)}
                value={size}
              >
                <option value="small">Petit toutou (moins de 10kg)</option>
                <option value="medium">
                  Moyen toutou (entre 10kg et 25kg)
                </option>
                <option value="large">Grand toutou (plus de 25kg)</option>
              </select>
              <div className="form-inputs file-input">
                <input
                  type="file"
                  name="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => setImages(event.target.files)}
                  multiple
                />
              </div>
              {animal.images && animal.images.length > 0 && (
                <fieldset>
                  <legend>Sélectionnez les images à remplacer</legend>
                  {animal.images.map((image, i) => (
                    <div key={i}>
                      <div
                        className={
                          selectedImages.includes(image)
                            ? "selected-image"
                            : "choose-image"
                        }
                        onClick={() => {
                          if (selectedImages.includes(image)) {
                            setSelectedImages(
                              selectedImages.filter(
                                (selectedImage) => selectedImage !== image
                              )
                            );
                          } else {
                            setSelectedImages(selectedImages.concat(image));
                          }
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                          alt={`${animal.name}_${i}`}
                        />
                      </div>
                    </div>
                  ))}
                </fieldset>
              )}
              <div className="cancel-confirm-buttons">
                <Link to={`/profile/animals/${animalId}`} className="cancel">
                  Retour
                </Link>
                <input className="confirm" type="submit" value="Modifier" />
              </div>
            </form>
          </>
        ) : (
          <h2>Chargement...</h2>
        )}
      </main>
    </>
  );
};

export default UpdateAnimal;
