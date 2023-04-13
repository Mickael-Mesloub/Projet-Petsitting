import { getMethod, putFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../allUserAnimals/styles.scss";

const UpdateAnimal = () => {
  const [animal, setAnimal] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const { userId, animalId } = useParams();

  useEffect(() => {
    getMethod(
      `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals/${animalId}`
    )
      .then((data) => setAnimal(data.animal))
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
      `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals/${animalId}/update-animal`,
      formData
    )
      .then((data) => setAnimal(data))
      .then(() => setSelectedImages([]));

    // Mettre à jour les autres données de l'animal
    formData.append("name", name);
    formData.append("description", description);
    formData.append("size", size);
    if (images && images.length > 0) {
      for (const image of images) {
        formData.append("file", image);
      }
    }
    putFormData(
      `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals/${animalId}/update-animal`,
      formData
    ).then((data) => setAnimal(data));
  };

  useEffect(() => {
    console.log(selectedImages);
  }, []);

  return (
    <>
      <h1>Modifier l'animal</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="description">Présentation : </label>
        <textarea
          name="description"
          rows="5"
          cols="50"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <label htmlFor="size">Taille : </label>
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
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedImages([...selectedImages, image]);
                    } else {
                      setSelectedImages(
                        selectedImages.filter(
                          (selectedImage) => selectedImage !== image
                        )
                      );
                    }
                  }}
                  name={`deleteImages[${i}]`}
                />

                <div
                  className={
                    selectedImages.includes(image)
                      ? "selected-image"
                      : "choose-image"
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </fieldset>
        )}
        <input type="submit" value="Modifier" />
      </form>
    </>
  );
};

export default UpdateAnimal;
