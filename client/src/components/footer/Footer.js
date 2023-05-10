import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import "./styles.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content-box social-media-box">
          <p className="start">Mes réseaux sociaux</p>
          <div className="end social-media-icons-boxes">
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
        <div className="footer-content-box">
          <div className="start">©2023 Rubieland. Tous droits réservés</div>
        </div>
        <div className="footer-content-box contact">
          <p className="start">Me contacter</p>
          <div className="end">
            <address>
              <Link className="contact-link" to="mailto:contact@rubieland.com">
                📧 : contact@rubieland.com
              </Link>

              <Link className="contact-link" to="tel:+33606060606">
                📞 : 06-06-06-06-06
              </Link>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
