import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="newspage-main">
      <h2>Actualités</h2>
      <section>
        {articles && articles.length === 0 ? (
          <p>
            Vous pourrez suivre mes actualités prochainement sur cette page ✍️ !
          </p>
        ) : (
          <article className="news-articles">
            {articles.map((article, i) => (
              <div key={i} className="news-article">
                {article.images.length > 0 && (
                  <div className="article-image">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${article.images[0]}`}
                      alt={article.title}
                    />
                  </div>
                )}
                <div className="article-text-container">
                  <h4>
                    <Link to={`/news/${article._id}`}>{article.title}</Link>
                  </h4>
                  <p className="article-content">
                    {article.content.substring(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </article>
        )}
      </section>
    </main>
  );
};

export default News;
