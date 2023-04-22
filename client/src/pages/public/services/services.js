import { useState, useEffect } from "react";
import { getMethod } from "../../../helpers/fetch";
import "./styles.scss";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/services`)
      .then((data) => setServices(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="prestationPage-main">
      {services && services.length === 0 ? (
        <p>Aucune prestation n'est disponible pour le moment.</p>
      ) : (
        <section>
          <h2>Mes prestations</h2>
          <article>
            {services.map((service, i) => (
              <div className="services-container" key={i}>
                {service.visible && (
                  <div key={i} className="service">
                    <p className="service-text service-name">{service.name}</p>
                    <p className="service-text service-description">
                      {service.description}
                    </p>
                    <p className="service-text service-price">
                      À partir de <b>{service.price}€</b>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </article>
        </section>
      )}
    </main>
  );
};

export default Services;
