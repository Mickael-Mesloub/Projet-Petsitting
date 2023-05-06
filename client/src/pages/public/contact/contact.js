import "./styles.scss";

const Contact = () => {
  return (
    <main className="contactPage-main">
      <h2>Contact</h2>
      <p>
        Pour toute demande d'information, n'hésitez pas à me contacter en
        remplissant le formulaire ci-dessous !
      </p>
      <form className="contact-form">
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
  );
};

export default Contact;
