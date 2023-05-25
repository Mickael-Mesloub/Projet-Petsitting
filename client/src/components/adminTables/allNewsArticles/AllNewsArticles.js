import { useEffect, useState } from "react";
import { deleteMethod, getMethod } from "../../../helpers/fetch.js";
import { Link, useNavigate } from "react-router-dom";
import { MdCreate, MdDelete } from "react-icons/md";
import "./styles.scss";

const AdminNews = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/admin/news`)
      .then((data) => {
        setArticles(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteArticle = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet article ?")) {
      deleteMethod(`${process.env.REACT_APP_API_URL}/admin/news/${id}`)
        .then(() => {
          // Supprime l'article de la liste des articles et met à jour la data
          setArticles(articles.filter((article) => article._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="allArticles-main">
      <h3>Articles</h3>
      {articles && articles.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Titre</th>
                <th>Aperçu</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  className={article.forWhichPage === "news" ? "news" : "home"}
                  key={i}
                >
                  <td>
                    {article.forWhichPage === "news" ? "Actualités" : "Accueil"}
                  </td>
                  <td>
                    {article.title.length > 30
                      ? `${article.title.substring(0, 30)}...`
                      : article.title}
                  </td>
                  <td>
                    {article.content.length > 30
                      ? `${article.content.substring(0, 30)}...`
                      : article.content}
                  </td>

                  <td
                    className="clickable update"
                    onClick={() =>
                      navigate(`/admin/news/${article._id}/update-article`)
                    }
                  >
                    Modifier <MdCreate />
                  </td>
                  <td
                    className="clickable delete"
                    onClick={() => deleteArticle(article._id)}
                  >
                    Supprimer <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="link-container">
            <Link to={`/admin/news/create-article`} className="link">
              Rédiger un article
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-data">Aucun article n'a été créé.</div>
      )}
    </main>
  );
};

export default AdminNews;
