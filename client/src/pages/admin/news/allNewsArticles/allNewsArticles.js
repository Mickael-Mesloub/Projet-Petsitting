import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMethod } from "../../../../helpers/fetch.js";

import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";

const AdminNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/news`)
      .then((data) => {
        setNews(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <AdminLinks />
      <main>
        <h2>Actualités</h2>
        <div className="news-container">
          {news && news.length === 0 ? (
            <>
              <div>Aucune news créée pour le moment</div>
              <div className="admin-links-container">
                <Link className="admin-link" to="/admin/news/create-article">
                  Nouvel article
                </Link>
              </div>
            </>
          ) : (
            <>
              {news.map((article, i) => (
                <div key={i} className="admin-article">
                  <div>
                    <Link to={`/admin/news/${article._id}`}>
                      {article.title}
                    </Link>
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
                              &{image}
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
      </main>
    </>
  );
};

export default AdminNews;
