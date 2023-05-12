import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod, putMethod } from "../../../../helpers/fetch";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import "./styles.scss";

const UpdateService = () => {
  const [service, setService] = useState({});
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedInput, setSelectedInput] = useState(true);
  const [countChar, setCountChar] = useState(0);
  const { serviceId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getMethod(
      `${process.env.REACT_APP_BACKEND_URL}/admin/services/${serviceId}`
    )
      .then((data) => {
        setService(data);
        setCategory(data.category)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedService = {
      category,
      name,
      description,
      price,
      visible,
    };

    putMethod(
      `${process.env.REACT_APP_BACKEND_URL}/admin/services/${serviceId}`,
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
    setVisible(event.target.value === "yes");
    setSelectedInput(!selectedInput);
    setVisible(event.target.value);
  };

  return (
    <main className="updateService-main">
      <h2>Modifier la prestation</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Catégorie : </label>
        <select
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          // defaultValue={category}
        >
          <option value="grooming">Soin/Éducation</option>
          <option value="sitting">Garde à domicile</option>
        </select>
        <input
          type="text"
          name="name"
          defaultValue={service.name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          name="description"
          rows="5"
          cols="50"
          defaultValue={service.description}
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
          defaultValue={service.price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <fieldset>
          <legend>Rendre la prestation visible pour les utilisateurs?</legend>
          <div className="buttons">
            <div className="radio-button">
            <label htmlFor="true">Oui</label>
              <input
                type="radio"
                name="yes"
                value="true"
                checked={selectedInput}
                onChange={handleRadioChange}
              />
            </div>
            <div className="radio-button">
            <label htmlFor="false">Non</label>
              <input
                type="radio"
                name="no"
                value="false"
                checked={!selectedInput}
                onChange={handleRadioChange}
              />
            </div>
          </div>
        </fieldset>
        <input type="submit" value="Modifier" />
      </form>
    </main>
  );
};

export default UpdateService;
