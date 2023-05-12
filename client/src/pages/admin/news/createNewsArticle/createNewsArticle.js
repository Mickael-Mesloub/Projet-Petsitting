import { useState } from "react";
import { postFormData } from "../../../../helpers/fetch.js";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./styles.scss";

const CreateNews = () => {
  const [forWhichPage, setForWhichPage] = useState("news");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [countChar, setCountChar] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("forWhichPage", forWhichPage);
    formData.append("title", title);
    formData.append("content", content);

    for (const file of files) {
      formData.append("file", file);
    }

    postFormData(
      `${process.env.REACT_APP_BACKEND_URL}/admin/news/create-article`,
      formData
    )
      .then(() => {
        navigate("/admin");
        toastSuccess("Créé avec succès 🎉");
      })
      .catch((error) => {
        toastError("Création échouée ❌");
        console.log(error);
      });
  };

  return (
     <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Ajouter un article</title>
          <meta 
              name="description" 
              content="Formulaire pour ajouter un article"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main className="createArticle-main">
        <h2>Ajouter un article</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="forWhichPage">Pour quelle page ?</label>
          <select
            name="forWhichPage"
            value={forWhichPage}
            required
            onChange={(e) => setForWhichPage(e.target.value)}
          >
            <option name="news" value="news">
              Actualités
            </option>
            <option name="home" value="home">
              Accueil
            </option>
          </select>
  
          <input
            type="text"
            name="title"
            placeholder="Titre"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Contenu"
            rows="5"
            cols="50"
            required
            onChange={(e) => {
              setContent(e.target.value);
              setCountChar(e.target.value.length);
            }}
          ></textarea>
          <div className="character-counter">Nb de caractères : {countChar}</div>
          <div className="form-inputs file-input">
            <label htmlFor="file">Ajouter des images : </label>
            <input
              type="file"
              name="file"
              accept="image/jpeg, image/png"
              multiple
              required
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <input type="submit" value="Ajouter" />
        </form>
      </main>
    </>
  );
};

export default CreateNews;
