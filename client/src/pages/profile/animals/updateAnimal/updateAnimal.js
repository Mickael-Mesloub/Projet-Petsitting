import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.scss";

const UpdateAnimal = () => {
  const [animal, setAnimal] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const navigate = useNavigate();
  const { animalId } = useParams();

  useEffect(() => {
    getMethod(
      `${process.env.REACT_APP_BACKEND_URL}/profile/animals/${animalId}`
    )
      .then((data) => {
        setAnimal(data.animal);
      })
      .catch((error) => console.log(error));
  }, []);

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
    <main className="update-animal-main">
      <h2>Modifier l'animal</h2>
      <form className="update-animal-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <textarea
          placeholder="Décrivez-nous votre toutou..."
          name="description"
          rows="10"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <label className="size-label" htmlFor="size">
          Taille :{" "}
        </label>
        <select
          name="size"
          onChange={(event) => setSize(event.target.value)}
          defaultValue={size}
        >
          <option value="small">Petit toutou (moins de 10kg)</option>
          <option value="medium">Moyen toutou (entre 10kg et 25kg)</option>
          <option value="large">Grand toutou (plus de 25kg)</option>
        </select>
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setImages(event.target.files)}
          multiple
        />
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

        <input type="submit" value="Modifier" />
      </form>
    </main>
  );
};

export default UpdateAnimal;
