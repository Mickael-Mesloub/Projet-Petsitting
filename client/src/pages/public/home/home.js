import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMethod } from "../../../helpers/fetch";
import { useState, useEffect } from "react";
import "./styles.scss";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [usernameCapitalized, setUsernameCapitalized] = useState("");
  const { user } = useSelector((state) => state);

  // Get news articles for the "latest news" section

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news`)
      .then((data) => setArticles(data.slice(-3)))
      .catch((error) => console.log(error));
  }, []);

  // Capitalize username's first letter

  useEffect(() => {
    capitalizeUsername(user.firstName).then((username) =>
      setUsernameCapitalized(username)
    );
  }, [user]);

  const capitalizeUsername = async (name) => {
    if (user.isLogged) {
      const username = await name;
      const usernameFirstLetter = await username.charAt(0);
      const capitalizeUsername =
        (await usernameFirstLetter.toUpperCase()) + username.slice(1);
      return capitalizeUsername;
    }
  };

  return (
    <main>
      {user.isLogged ? (
        <h3>Bienvenue {usernameCapitalized} 👋 !</h3>
      ) : (
        <section>
          <h3>Bienvenue sur mon site 👋 !</h3>
          <div className="articles-container">
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

      <section className="presentation">
        <h3>Laissez-moi vous présenter... </h3>
        <div className="articles-container">
          <article>
            <h4>Qui je suis 📜</h4>
            <p>
              Nunc elit leo, viverra quis libero non, tincidunt vehicula est.
              Sed ultricies sit amet dolor egestas blandit. Fusce lobortis
              pharetra sem, in aliquet erat sodales non. Etiam eu tellus
              placerat, auctor tortor euismod, scelerisque justo. Proin vel
              iaculis purus. Nunc a auctor lectus, non tincidunt magna. Aliquam
              erat volutpat. Aenean sagittis interdum nunc porttitor blandit.
              Quisque ut ante sit amet odio commodo bibendum. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Maecenas pellentesque diam at fermentum hendrerit.
            </p>
            <p>
              In rutrum, tellus at molestie luctus, est felis hendrerit diam,
              nec mollis erat sem vitae lectus. Nunc ac nunc a odio interdum
              tempus id a neque. Duis eget scelerisque nibh. Quisque molestie
              pharetra nulla, ut tristique lectus aliquam suscipit. Sed
              facilisis et mi quis condimentum. Donec nec lacinia justo. Nam in
              massa imperdiet, auctor ante sit amet, elementum urna. Sed
              hendrerit imperdiet elit, vitae consequat nunc lacinia ac. Mauris
              venenatis ac ex eget consectetur. Duis sed luctus quam. Vestibulum
              pulvinar metus eu enim fermentum, eget faucibus justo viverra.
            </p>
          </article>
          <article>
            <h4>Mon site 💻</h4>
            <p>
              Maecenas non magna risus. Sed vel quam eu ipsum accumsan imperdiet
              at facilisis mauris. Pellentesque porta, nunc vel faucibus
              vehicula, nunc lectus maximus ante, quis elementum augue dui sed
              augue. In sem lectus, posuere ut bibendum suscipit, tincidunt sit
              amet elit. Nunc porttitor, turpis vel iaculis faucibus, velit
              lectus efficitur mi, nec fermentum turpis nibh at nulla. Etiam
              sagittis, leo in maximus vehicula, ipsum purus efficitur justo,
              non convallis nibh libero quis magna. Sed egestas, nibh a laoreet
              elementum, leo velit ornare lorem, non dictum turpis magna eget
              quam. Nunc eget erat sed tortor convallis ultrices eu vitae
              tellus.
            </p>
            <p>
              Pellentesque molestie porta urna, id pulvinar velit tempus in.
              Mauris sapien turpis, lacinia et turpis ac, consequat lacinia
              nulla. Nulla viverra placerat tincidunt. Donec tempor leo vel
              interdum interdum. Donec pellentesque molestie euismod. Nunc
              cursus nisl vehicula nulla finibus, eget iaculis ante luctus.
              Vivamus eleifend nisi eget tortor finibus, non imperdiet dui
              gravida. Duis nec feugiat metus.
            </p>
          </article>
          <article>
            <h4>Lorem ipsum</h4>
            <p>
              Suspendisse ut sem mattis metus laoreet ullamcorper. Proin
              pulvinar interdum lorem eget elementum. Integer sit amet tristique
              odio. Nullam maximus ante laoreet nunc ullamcorper tempor.
              Vestibulum ultrices mi eros, vel viverra nulla placerat sit amet.
              Sed pretium tortor purus, vel auctor mauris porttitor mattis.
              Pellentesque maximus ante orci, a viverra nulla consectetur non.
              Pellentesque quis pellentesque magna, nec volutpat tellus. Donec
              neque tellus, tempus vitae neque eget, tempus interdum felis. Sed
              ultrices ligula erat, sit amet faucibus massa tincidunt at.
            </p>
            <p>
              Quisque vehicula massa vel lorem consectetur egestas. Donec semper
              laoreet sem. Proin vitae risus id elit ornare rhoncus vitae
              finibus eros. Praesent at dolor ut nulla scelerisque scelerisque.
              Donec consectetur urna massa, non rhoncus augue tempor quis. Nam
              vitae mi sollicitudin libero pretium rhoncus. Ut sodales est vitae
              lacus molestie, molestie pretium ante vehicula. Maecenas ultrices,
              nulla id fringilla elementum, nisi ipsum accumsan quam, sed
              volutpat diam metus iaculis lorem. Nunc posuere feugiat leo, eget
              mattis orci. Vestibulum maximus felis quis ex tincidunt
              pellentesque. Pellentesque iaculis dignissim nisi rutrum vehicula.
            </p>
          </article>
        </div>
      </section>
      <section>
        <h3>Mes dernières actus 📣</h3>
        <div className="articles-container last-news-container">
          {articles.length === 0 ? (
            <p>
              Vous trouverez dans cette section mes actualités les plus récentes
              ✍️ !
            </p>
          ) : (
            <article>
              {articles.map((article, i) => (
                <div key={i} className="article-container">
                  <h4>{article.title}</h4>
                  {article.images.length > 0 && (
                    <div className="article-image">
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${article.images}`}
                        alt={article.title}
                      />
                    </div>
                  )}
                  <p className="article-content">
                    {article.content.substring(0, 100)}...
                  </p>
                  <div className="link-button">
                    <Link to="/news" className="link-to-page">
                      Toutes mes actus 📰
                    </Link>
                  </div>
                </div>
              ))}
            </article>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
