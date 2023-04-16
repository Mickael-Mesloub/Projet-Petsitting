import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.scss";

const NewsArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [articleImages, setArticleImages] = useState([]);
  const { articleId } = useParams();

  /**
   * mapper sur les images pour les afficher
   */

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news/${articleId}`)
      .then((data) => {
        setArticle(data);
        setArticleImages(data.images);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(articleImages);
  }, []);

  return (
    <main className="article-page-main">
      {article && (
        <article>
          {articleImages && articleImages.length > 0 && (
            <div className="article-images-container">
              {articleImages.map((image, i) => (
                <div key={i} className="article-image">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                    alt={article.title}
                  />
                </div>
              ))}
            </div>
          )}
          <h3>{article.title}</h3>
          <em>Publié le {new Date(article.createdAt).toLocaleDateString()}</em>
          <p>{article.content}</p>
        </article>
      )}
      <div className="link-button">
        <Link to="/news" className="link-to-page">
          Retourner aux actus 📰
        </Link>
      </div>
    </main>
  );
};

export default NewsArticleDetails;
