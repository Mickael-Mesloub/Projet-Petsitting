import { Link } from "react-router-dom";
import "./styles.scss";

const NotFound = (props) => {
  return (
    <main className="notFoundPage-main">
      <h2>{props.title}</h2>
      <div className="notFound-content">
        <p>{props.content}</p>
        <p>{props.message}</p>
        <div className="notFound-link-container">
          <Link className="notFound-link" to={props.linkToHomepage}>
            {props.linkToContent}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
