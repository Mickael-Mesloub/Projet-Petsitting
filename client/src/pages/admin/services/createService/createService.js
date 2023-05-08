import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putMethod } from "../../../../helpers/fetch";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import "./styles.scss";

const CreateService = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedInput, setSelectedInput] = useState(true);
  const [countChar, setCountChar] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedService = {
      name,
      description,
      price,
      visible,
    };

    putMethod(
      `${process.env.REACT_APP_BACKEND_URL}/admin/services/create-service`,
      updatedService
    )
      .then(() => {
        toastSuccess("Modifié avec succès 🎉");
        navigate(`/admin`);
      })
      .catch((error) => {
        toastError("Modification échouée ❌");
        console.log(error);
      });
  };

  const handleRadioChange = (event) => {
    setSelectedInput(!selectedInput);
    setVisible(event.target.value);
  };

  return (
    <main className="createService-main">
      <h2>Créer une nouvelle prestation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom du service"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          name="description"
          rows="5"
          cols="50"
          placeholder="Informations à propos du service"
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
        <input type="submit" value="Créer" />
      </form>
    </main>
  );
};

export default CreateService;
