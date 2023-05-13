import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postMethod } from "../../../../helpers/fetch";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
import "./styles.scss";

const CreateService = () => {
  const [category, setCategory] = useState("grooming");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedInput, setSelectedInput] = useState(true);
  const [countChar, setCountChar] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newService = {
      category,
      name,
      description,
      price,
      visible,
    };

    postMethod(
      `${process.env.REACT_APP_BACKEND_URL}/admin/create-service`,
      newService
    )
      .then(() => {
        toastSuccess("Créé avec succès 🎉");
        navigate(`/admin`);
      })
      .catch((error) => {
        toastError("Création échouée ❌");
        console.log(error);
      });
  };

  const handleRadioChange = (event) => {
    setVisible(event.target.value === "yes");
    setSelectedInput(!selectedInput);
    setVisible(event.target.value);
  };

  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Admin - Ajouter une prestation</title>
          <meta 
              name="description" 
              content="Formulaire pour ajouter une prestation"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <main className="createService-main">
        <h2>Ajouter une prestation</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Catégorie : </label>
          <select
            name="category"
            onChange={(event) => setCategory(event.target.value)}
            defaultValue={category}
            required
          >
            <option value="grooming">Soin/Éducation</option>
            <option value="sitting">Garde à domicile</option>
          </select>
          <input
            type="text"
            name="name"
            placeholder="Nom du service"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            name="description"
            rows="5"
            cols="50"
            placeholder="Informations à propos du service"
            required
            onChange={(e) => {
              setDescription(e.target.value);
              setCountChar(e.target.value.length);
            }}
          ></textarea>
          <div className="character-counter">Nb de caractères : {countChar}</div>
          <label htmlFor="price">Prix (en €) : </label>
          <input
            type="number"
            name="price"
            placeholder={`Prix en €`}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <fieldset>
            <legend>Rendre la prestation visible pour les utilisateurs?</legend>
            <div className="buttons">
              <div className="radio-button">
                <input
                  type="radio"
                  name="yes"
                  value="true"
                  checked={selectedInput}
                  onChange={handleRadioChange}
                />
                <label htmlFor="true">Oui</label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name="no"
                  value="false"
                  checked={!selectedInput}
                  onChange={handleRadioChange}
                />
                <label htmlFor="false">Non</label>
              </div>
            </div>
          </fieldset>
          <div className="cancel-confirm-buttons">
            <Link to="/admin" className="cancel">Retour</Link>
            <input className="confirm" type="submit" value="Ajouter" />
          </div>
        </form>
      </main>
    </>
  );
};

export default CreateService;
