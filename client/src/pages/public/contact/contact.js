import "./styles.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  }
  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Contact</title>
          <meta 
              name="description" 
              content="Contact et demande d'informations"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, contact, demande, informations" />
      </Helmet>
      <main className="contactPage-main">
        <h2>Contact</h2>
        <p>Pour toute demande d'information, n'hésitez pas à me contacter !</p>
        <div className="contact">
          <address>
              <Link className="contact-link" to="mailto:contact@rubieland.com">
                📧 : contact@rubieland.com
              </Link>
              <br />
              <Link className="contact-link" to="tel:+33606060606">
                📞 : 06-06-06-06-06
              </Link>
            </address>
        </div>
         <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-inputs">
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Téléphone (format XX XX XX XX XX)"
              pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
            />
          </div>
  
          <div className="form-inputs">
            <textarea
              placeholder="Écrivez votre message ici"
              required
              rows="10"
            ></textarea>
          </div>
  
          <input
            type="submit"
            name="submit"
            className="register-btn"
            value="Envoyer"
          />
        </form>
        
      </main>
    </>
  );
};

export default Contact;
