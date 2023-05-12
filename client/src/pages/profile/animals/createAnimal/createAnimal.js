import { getMethod, postFormData } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
import "./styles.scss";

const CreateAnimal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("small");
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile`);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("size", size);

    for (const file of files) {
      formData.append("file", file);
    }

    postFormData(
      `${process.env.REACT_APP_BACKEND_URL}/profile/create-animal`,
      formData
    )
      .then(() => {
        navigate("/profile");
        toastSuccess("Ajouté avec succès 🎉");
      })
      .catch((error) => {
        toastError("Création échouée ❌");
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Ajouter un toutou</title>
          <meta 
              name="description" 
              content="Ajouter un toutou associé à son profil utilisateur"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, ajouter, profil, informations, détails" />
      </Helmet>
      <main className="create-animal-main">
        <h2>Ajouter un animal</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <textarea
            name="description"
            rows="5"
            cols="50"
            placeholder="Décrivez-nous votre toutou..."
            required
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <label htmlFor="size">Taille : </label>
          <select
            name="size"
            onChange={(event) => setSize(event.target.value)}
            defaultValue={size}
            required
          >
            <option value="small">Petit toutou (moins de 10kg)</option>
            <option value="medium">Moyen toutou (entre 10kg et 25kg)</option>
            <option value="large">Grand toutou (plus de 25kg)</option>
          </select>
          <div className="form-inputs file-input">
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              required
              onChange={(event) => setFiles(event.target.files)}
              multiple
            />
          </div>
          <input type="submit" value="Ajouter" />
        </form>
      </main>
    </>
  );
};

export default CreateAnimal;
