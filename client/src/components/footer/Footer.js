import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import "./styles.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content-box social-media-box">
          <p>Retrouvez-moi sur mes réseaux sociaux 👇</p>
          <div className="social-media-icons-boxes">
            <Link
              to="https://www.facebook.com"
              className="social-media-icon fb-icon"
            >
              <FiFacebook />
            </Link>
            <Link
              to="https://www.instagram.com"
              className="social-media-icon ig-icon"
            >
              <FiInstagram />
            </Link>
            <Link
              to="https://www.twitter.com"
              className="social-media-icon tt-icon"
            >
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
