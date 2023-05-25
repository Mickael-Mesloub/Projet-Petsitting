import { useState, useEffect } from "react";
import { deleteMethod, getMethod } from "../../../helpers/fetch";
import { Link, useNavigate } from "react-router-dom";
import { MdCreate, MdDelete } from "react-icons/md";
import "./styles.scss";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/services`)
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteService = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce service ?")) {
      deleteMethod(`${process.env.REACT_APP_API_URL}/admin/services/${id}`)
        .then(() => {
          // Supprime le service de la liste des services et met à jour la data
          setServices(services.filter((service) => service._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  const setCategoryClass = (category) => {
    switch (category) {
      case "grooming":
        return "grooming";
      case "sitting":
        return "sitting";
      default:
        return "";
    }
  };

  const convertCategory = (category) => {
    switch (category) {
      case "grooming":
        return "Soin/Éducation";
      case "sitting":
        return "Garde";
      default:
        return "";
    }
  };

  return (
    <main className="allServices-main">
      <h3>Prestations</h3>
      {services && services.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Visible</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr className={setCategoryClass(service.category)} key={i}>
                  <td>{convertCategory(service.category)}</td>
                  <td>
                    {service.name.length > 30
                      ? `${service.name.substring(0, 30)}...`
                      : service.name}
                  </td>
                  <td>
                    {service.description.length > 30
                      ? `${service.description.substring(0, 30)}...`
                      : service.description}
                  </td>
                  <td>{`${service.price}€`}</td>
                  <td>{service.visible == true ? "Oui" : "Non"}</td>
                  <td
                    className="clickable update"
                    onClick={() =>
                      navigate(`/admin/services/${service._id}/update-service`)
                    }
                  >
                    Modifier <MdCreate />
                  </td>
                  <td
                    className="clickable delete"
                    onClick={() => deleteService(service._id)}
                  >
                    Supprimer <MdDelete />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="link-container">
            <Link to={`/admin/services/create-service`} className="link">
              Ajouter une prestation
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-data">Aucune prestation n'a été crée.</div>
      )}
    </main>
  );
};

export default AdminServices;
