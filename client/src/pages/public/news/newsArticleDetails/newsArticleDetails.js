import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.scss";

const NewsArticleDetails = () => {
  const [article, setArticle] = useState({});
  const [articleImages, setArticleImages] = useState([]);
  const [modalIsOpened, setModalIsOpened] = useState(false);
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

  const openModal = () => {
    setModalIsOpened(true);
  };

  const closeModal = () => {
    setModalIsOpened(false);
  };
  return (
    <main className="article-page-main modal-opened">
      {article && article._id === articleId ? (
        <section>
          <article>
            {articleImages && articleImages.length === 1 && (
              <div className="article-image-container">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${articleImages[0]}`}
                  alt={article.title}
                  onClick={openModal}
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
                          onClick={openModal}
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
            <div className="link-button">
              <Link to="/news" className="link-to-page">
                Retourner aux actus 📰
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className="not-found">
          <p> ❌ Cet article n'existe pas ❌ </p>
          <div className="link-container">
            <div className="link-button">
              <Link to="/news" className="link-to-page">
                Retourner aux actus 📰
              </Link>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpened}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={
          modalIsOpened ? "modal-container modal-opened" : "modal-container"
        }
      >
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${articleImages[0]}`}
          alt={article.title}
          className="modal-image"
        />
        <button className="modal-close" conClick={closeModal}>
          X
        </button>
      </Modal>
    </main>
  );
};

export default NewsArticleDetails;
