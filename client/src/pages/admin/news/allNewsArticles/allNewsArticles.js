import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMethod } from "../../../../helpers/fetch.js";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";

const AdminNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/news`)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <AdminLinks />

      <h2>Actualités</h2>

      <div className="news-container">
        {articles && articles.length === 0 ? (
          <>
            <div>Aucun article créée pour le moment</div>
            <div className="admin-links-container">
              <Link className="admin-link" to="/admin/news/create-article">
                Créer un article
              </Link>
            </div>
          </>
        ) : (
          <>
            {articles.map((article, i) => (
              <div key={i} className="admin-article">
                <div>
                  <Link to={`/admin/news/${article._id}`}>{article.title}</Link>
                </div>
                <div>{article.content}</div>
                <>
                  {article.images.length === 0 ? (
                    <div>Aucune image n'a été ajoutée pour cet article</div>
                  ) : (
                    <>
                      {article.images.map((image, i) => (
                        <div key={i} className="admin-news-image">
                          <Link
                            key={i}
                            to={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                          >
                            {image}
                          </Link>
                        </div>
                      ))}
                    </>
                  )}
                </>
                <div>{article.name}</div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="admin-links-container">
        <Link className="admin-link" to="/admin/news/create-article">
          Nouvel article
        </Link>
      </div>

      {articles && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom de famille</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={i}>
                  <td>{article._id}</td>
                  <td>{article.title}</td>

                  <td>
                    <Link
                      to={`${process.env.REACT_APP_BACKEND_URL}/admin/news/${articles._id}`}
                    >
                      {articles._id}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminNews;
