import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.scss";

const NewsArticleDetails = () => {
  const [article, setArticle] = useState({});
  const { articleId } = useParams();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news/${articleId}`)
      .then((data) => setArticle(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <h2>Article</h2>
      {article && (
        <article>
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
