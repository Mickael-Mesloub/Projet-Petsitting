import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./styles.scss";

const News = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/news`)
      .then((data) => {
        const newsArticles = data.filter(
          (article) => article.forWhichPage === "news"
        );
        setArticles(
          newsArticles.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Rubieland 🐶 - Actualités</title>
        <meta name="description" content="Toutes les actualités de Rubieland" />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, article, actualités, news"
        />
      </Helmet>
      <main className="newspage-main">
        <section>
          <h2>Actualités</h2>

          {articles && articles.length === 0 ? (
            <p className="no-content">
              Vous pourrez suivre mes actualités prochainement sur cette page ✍️
              !
            </p>
          ) : (
            <article className="news-articles">
              {articles.map((article, i) => (
                <div
                  key={i}
                  className="news-article"
                  onClick={() => navigate(`/news/${article._id}`)}
                >
                  {article.images.length > 0 && (
                    <div className="article-image">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${article.images[0]}`}
                        alt={article.title}
                      />
                    </div>
                  )}
                  <div className="article-text-container">
                    <em style={{ fontSize: "13px" }}>
                      Publié le{" "}
                      {new Date(article.createdAt).toLocaleDateString()}
                    </em>
                    <h4>
                      {article.title.length > 30
                        ? `${article.title.substring(0, 30)}...`
                        : article.title}
                    </h4>

                    <p className="article-content">
                      {article.content.length > 50
                        ? `${article.content.substring(0, 50)}...`
                        : article.content}
                    </p>
                  </div>
                </div>
              ))}
            </article>
          )}
        </section>
      </main>
    </>
  );
};

export default News;
