import { useState, useEffect } from "react";
import { getMethod, putFormData } from "../../../../helpers/fetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
import "./styles.scss";

const UpdateArticle = () => {
  const [forWhichPage, setForWhichPage] = useState("");
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/admin/news/${articleId}`)
      .then((data) => {
        setArticle(data);
        setForWhichPage(data.forWhichPage);
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
      `${process.env.REACT_APP_API_URL}/admin/news/${articleId}`,
      formData
    )
      .then((data) => setArticle(data))
      .then(() => setSelectedImages([]))
      .then(() => {
        formData.append("forWhichPage", forWhichPage);

        formData.append("title", title);
        formData.append("content", content);
        if (images && images.length > 0) {
          for (const image of images) {
            formData.append("file", image);
          }
        }
        putFormData(
          `${process.env.REACT_APP_API_URL}/admin/news/${articleId}`,
          formData
        )
          .then(() => {
            toastSuccess("Modifié avec succès 🎉");
            navigate(`/admin`);
          })
          .catch((error) => {
            toastError("Modification échouée ❌");
            console.log(error);
          });
      });
  };

  return (
    <>
      <Helmet>
        <title>
          Rubieland 🐶{" "}
          {article
            ? `- Admin - Modifier un article - ${article.title}`
            : "- Admin - Modifier un article"}
        </title>
        <meta
          name="description"
          content={
            article
              ? `Formulaire pour modifier un article - ${article.title}`
              : "Formulaire pour modifier un article"
          }
        />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85"
        />
      </Helmet>
      <main className="updateArticle-main">
        <h2>Modifier l'article</h2>
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
            defaultValue={article.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            rows="5"
            cols="50"
            defaultValue={article.content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="form-inputs file-input">
            <label htmlFor="file">Images : </label>
            <input
              type="file"
              name="file"
              accept="image/jpeg, image/png"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </div>
          {article.images && article.images.length > 0 && (
            <fieldset>
              <legend>Sélectionnez les images à remplacer</legend>
              {article.images.map((image, i) => (
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
                      src={`${process.env.REACT_APP_API_URL}/${image}`}
                      alt={`${article.title}_${i}`}
                    />
                  </div>
                </div>
              ))}
            </fieldset>
          )}
          <div className="cancel-confirm-buttons">
            <Link to="/admin" className="cancel">
              Retour
            </Link>
            <input className="confirm" type="submit" value="Modifier" />
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateArticle;
