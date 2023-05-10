import { Link } from "react-router-dom";
import "./styles.scss";

const NotFound = () => {
  return (
    <main className="notFoundPage-main">
      <h2>Erreur 404 : PAGE NOT FOUND</h2>
      <div className="notFound-content">
        <p>Cette page n'existe pas.</p>
        <p>Revenir à l'accueil 👇</p>
        <div className="notFound-link-container">
          <Link className="notFound-link" to="/">
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
