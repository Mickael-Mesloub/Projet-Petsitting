import AdminLinks from "../../../../components/adminLinks/AdminLinks";
import { useState, useEffect } from "react";
import { deleteMethod, getMethod } from "../../../../helpers/fetch";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const [service, setService] = useState({});
  const { serviceId } = useParams();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/admin/services/${serviceId}`)
      .then((data) => setService(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      {service && (
        <>
          <AdminLinks />
          <main>
            <h2>Détails du service {service.name} </h2>
            <div className="services-container">
              <div>Intitulé du service : {service.name}</div>
              <div>description du service : {service.description}</div>
              <div>Prix de base du service : {service.price}</div>
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Êtes-vous sûr(e) de vouloir supprimer cette prestation ?"
                  )
                ) {
                  deleteMethod(
                    `${process.env.REACT_APP_API_URL}/admin/services/${serviceId}`
                  );
                }
              }}
            >
              Supprimer
            </button>
            <Link
              className="admin-link"
              to={`/admin/services/${serviceId}/update-service`}
            >
              Modifier la prestation
            </Link>
          </main>
        </>
      )}
    </main>
  );
};

export default ServiceDetails;
