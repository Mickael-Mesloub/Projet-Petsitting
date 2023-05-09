import { useState, useEffect } from "react";
import { deleteMethod, getMethod } from "../../../helpers/fetch";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdCreate, MdDelete } from "react-icons/md";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/services`)
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteService = (id) => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce service ?")) {
      deleteMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/services/${id}`)
        .then(() => {
          // Supprime le service de la liste des services et met à jour la data
          setServices(services.filter((service) => service._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <main className="allServices-main">
      <h3>Services</h3>
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
                <tr
                  className={
                    service.category === "grooming" ? "grooming" : "sitting"
                  }
                  key={i}
                >
                  <td>{service.category}</td>
                  <td>{service.name}</td>
                  <td>{service.description.substring(0, 30)}...</td>
                  <td>{service.price}</td>
                  <td>{service.visible.toString()}</td>
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
