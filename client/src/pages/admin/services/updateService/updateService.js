import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod, putMethod } from "../../../../helpers/fetch";
import { toastError, toastSuccess } from "../../../../components/toast/Toast";
import { Helmet } from "react-helmet";
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
    getMethod(`${process.env.REACT_APP_API_URL}/admin/services/${serviceId}`)
      .then((data) => {
        setService(data);
        setCategory(data.category);
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
      `${process.env.REACT_APP_API_URL}/admin/services/${serviceId}`,
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
    <>
      <Helmet>
        <title>
          Rubieland 🐶{" "}
          {service
            ? `- Admin - Modifier une prestation - ${service.name}`
            : "- Admin - Modifier une prestation"}
        </title>
        <meta
          name="description"
          content={
            service
              ? `Formulaire pour modifier une prestation - ${service.name}`
              : "Formulaire pour modifier une prestation"
          }
        />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85"
        />
      </Helmet>
      <main className="updateService-main">
        <h2>Modifier la prestation</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Catégorie : </label>
          <select
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
          <div className="character-counter">
            Nb de caractères : {countChar}
          </div>
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
          <div className="cancel-confirm-buttons">
            <Link to="/admin" className="cancel">
              Retour
            </Link>
            <input className="confirm" type="submit" value="Modifier" />
          </div>
        </form>
      </main>
    </>
  );
};

export default UpdateService;
