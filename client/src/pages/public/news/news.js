import { getMethod } from "../../../helpers/fetch";
import { useState, useEffect } from "react";
import "./styles.scss";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <h1>Actualités</h1>
      {articles.length === 0 ? (
        <p>
          Vous pourrez suivre mes actualités prochainement sur cette page ✍️ !
        </p>
      ) : (
        <div className="articles-container">
          {articles.map((article, i) => (
            <div key={i} className="article">
              <div className="article-image">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${article.images}`}
                  alt=""
                />
              </div>
              <h3>{article.title}</h3>
              <p className="article-inner-text">{article.content}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default News;
