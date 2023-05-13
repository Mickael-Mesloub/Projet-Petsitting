import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

const NewsArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [articleImages, setArticleImages] = useState([]);
  const { articleId } = useParams();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/news/${articleId}`)
      .then((data) => {
        setArticle(data);
        setArticleImages(data.images);
      })
      .catch((error) => console.log(error));
  }, [articleId]);

  const settings = {
    infinite: true,
    showThumbs: false,
    showStatus: false,
    autoPlay: true,
    infiniteLoop: true,
    interval: 3000,
  };

  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - {article ? `Actualités - ${article.title}`   : "Actualités"} </title>
          <meta 
              name="description" 
              content={article ? `Actualités - ${article.title}` : "Actualités"}
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, article, actualités, news" />
      </Helmet>
      <main className="article-page-main">
        {article && article._id === articleId ? (
          <section>
            <article>
              {articleImages && articleImages.length === 1 && (
                <div className="article-image-container">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${articleImages[0]}`}
                    alt={article.title}
                  />
                </div>
              )}
              {articleImages && articleImages.length > 1 && (
                <div className="carousel">
                  <div className="carousel-slider">
                    <Carousel {...settings}>
                      {articleImages.map((image, i) => (
                        <div key={i} className="carousel-slide">
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                            alt={`${i}_${article.title}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              )}
              <div className="article-content">
                <h3>{article.title}</h3>
                <em>
                  Publié le {new Date(article.createdAt).toLocaleDateString()}
                </em>
                <p>{article.content}</p>
              </div>
            </article>
            <div className="link-container">
              <div className="cancel-confirm-buttons">
                <Link to="/news" className="cancel">Retourner aux actus</Link>
              </div>
            </div>
          </section>
        ) : (
          <div className="not-found">
            <p> ❌ Cet article n'existe pas ❌ </p>
            <div className="link-container">
              <div className="cancel-confirm-buttons">
                <Link to="/news" className="cancel">Retourner aux actus</Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default NewsArticleDetails;
