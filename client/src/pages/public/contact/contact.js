import Header from "../../../components/header/Header";

const Contact = () => {
  return (
    <>
      <h1>Contact</h1>
      <p>
        Pour toute demande d'information, n'hésitez pas à me contacter en
        remplissant le formulaire ci-dessous !
      </p>
      <form
        method="post"
        encType="multipart/form-data"
        className="register-form"
      >
        <div className="register-form-inputs">
          <label htmlFor="firstName">Prénom : </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Prénom"
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="lastName">Nom : </label>
          <input type="text" name="lastName" id="lastName" placeholder="Nom" />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="phone">Téléphone : </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Format XX XX XX XX XX"
            pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
          />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="email">Email : </label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="password">Mot de passe : </label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="register-form-inputs">
          <label htmlFor="file">Avatar : </label>
          <input
            type="file"
            name="file"
            accept="image/jpeg, image/png"
            id="file"
          />
        </div>
        <input
          type="submit"
          name="submit"
          className="register-btn"
          value="Envoyer"
        />
      </form>
    </>
  );
};

export default Contact;
