import Header from "../../../../components/header/Header.js";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";
import { useState } from "react";
import { postMethod } from "../../../../helpers/fetch.js";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    for (const file of files) {
      formData.append("file", file);
    }

    postMethod(
      `${process.env.REACT_APP_BACKEND_URL}/admin/news/create-article`,
      formData
    )
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <AdminLinks />
      <h1>Nouvel article</h1>
      <form onSubmit={handleSubmit}>
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
    </>
  );
};

export default CreateNews;
