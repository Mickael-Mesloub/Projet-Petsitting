import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";
import { useEffect, useState } from "react";
import { postFormData, postMethod } from "../../../../helpers/fetch.js";

const CreateNews = () => {
  const [forWhichPage, setForWhichPage] = useState("news");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(forWhichPage);
  }, [forWhichPage]);

  return (
    <main>
      <AdminLinks />
      <h2>Nouvel article</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="forWhichPage">Pour quelle page ?</label>
        <select
          name="forWhichPage"
          value={forWhichPage}
          onChange={(e) => setForWhichPage(e.target.value)}
        >
          <option name="news" value="news">
            Actualités
          </option>
          <option name="home" value="home">
            Accueil
          </option>
        </select>

        <label htmlFor="title">Titre : </label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Contenu : </label>
        <textarea
          name="content"
          rows="5"
          cols="50"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label htmlFor="file">Images : </label>
        <input
          type="file"
          name="file"
          accept="image/jpeg, image/png"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <input type="submit" value="Créer" />
      </form>
    </main>
  );
};

export default CreateNews;
