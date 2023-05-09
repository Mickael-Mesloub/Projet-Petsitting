import "./styles.scss";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  }
  return (
    <main className="contactPage-main">
      <h2>Contact</h2>
      <p>Pour toute demande d'information, n'hésitez pas à me contacter !</p>
      <div className="contact">
        <p>📞 : 06-06-06-06-06</p>
        <p>📧 : contact@rubieland.com</p>
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
  );
};

export default Contact;
