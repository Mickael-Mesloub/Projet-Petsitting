import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMethod } from "../../../helpers/fetch";
import { useState, useEffect } from "react";
import "./styles.scss";

const Home = () => {
  const [homeArticles, setHomeArticles] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [usernameCapitalized, setUsernameCapitalized] = useState("");
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((data) => {
        const homeArticles = data.filter(
          (article) => article.forWhichPage === "home"
        );
        setHomeArticles(homeArticles);
        const newsArticles = data.filter(
          (article) => article.forWhichPage === "news"
        );

        // set the last 3 news articles for the "latest news" section
        setNewsArticles(newsArticles.slice(-3));
      })
      .catch((error) => console.log(error));
  }, []);

  // Capitalize username's first letter
  useEffect(() => {
    capitalizeText(user.firstName).then((username) =>
      setUsernameCapitalized(username)
    );
  }, [user]);

  const capitalizeText = async (name) => {
    if (user.isLogged) {
      const username = await name;
      const usernameFirstLetter = await username.charAt(0);
      const capitalizeText =
        (await usernameFirstLetter.toUpperCase()) + username.slice(1);
      return capitalizeText;
    }
  };

  return (
    <main className="homepage-main">
      {user.isLogged ? (
        <h3 className="welcome-message">
          Bienvenue {usernameCapitalized} 👋 !
        </h3>
      ) : (
        <section className="welcome-section">
          <h3>Bienvenue sur mon site 👋 !</h3>
          <div className="homepage-articles-container">
            <article>
              <h4>Vous avez déjà un compte ?</h4>
              <p>Connectez-vous 👇 !</p>
              <div className="link-button">
                <Link to="/login" className="link-to-page">
                  Connexion
                </Link>
              </div>
            </article>
            <article>
              <h4>Pas encore inscrit(e) ?</h4>
              <p>Suivez ce lien 👇 !</p>
              <div className="link-button">
                <Link to="/register" className="link-to-page">
                  Inscription
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}
      {homeArticles && (
        <section className="presentation-section">
          <h3>Laissez-moi vous présenter... </h3>
          <div className="homepage-articles-container">
            {homeArticles.map((article, i) => (
              <article key={i}>
                <h4>{article.title} </h4>
                <p>{article.content} </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="last-news-section">
        <h3>Mes dernières actus 📣</h3>
        <div className="homepage-articles-container last-news-container">
          {newsArticles.length === 0 ? (
            <p className="no-news">
              Vous trouverez dans cette section mes actualités les plus récentes
              ✍️ !
            </p>
          ) : (
            <article className="news-articles">
              {newsArticles.map((article, i) => (
                <div
                  key={i}
                  className="news-article"
                  onClick={() => navigate(`/news/${article._id}`)}
                >
                  {article.images.length > 0 && (
                    <div className="article-image">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${article.images[0]}`}
                        alt={article.title}
                      />
                    </div>
                  )}
                  <div className="article-text-container">
                    <h4>{article.title}</h4>
                    <p className="article-content">
                      {article.content.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              ))}
            </article>
          )}
        </div>
        <div className="link-button">
          <Link to="/news" className="link-to-page">
            Toutes mes actus 📰
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
