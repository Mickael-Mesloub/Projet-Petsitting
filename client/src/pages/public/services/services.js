import { useState, useEffect } from "react";
import { getMethod } from "../../../helpers/fetch";
import { Helmet } from "react-helmet";
import "./styles.scss";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/services`)
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const groomingServices = services.filter(
    (service) => service.visible && service.category === "grooming"
  );
  const sittingServices = services.filter(
    (service) => service.visible && service.category === "sitting"
  );

  return (
    <>
      <Helmet>
        <title>Rubieland 🐶 - Prestations</title>
        <meta
          name="description"
          content="Toutes les prestations disponibles pour le toilettage canin et le dogsitting"
        />
        <meta
          name="keywords"
          content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85, prestation, service, réserver, tarif, prix"
        />
      </Helmet>
      <main className="servicesPage-main">
        {services && services.length === 0 ? (
          <p>Aucune prestation n'est disponible pour le moment.</p>
        ) : (
          <section>
            <h2>Prestations</h2>
            <h3>Soin/Éducation de votre toutou ✨</h3>
            <article className="services-container">
              {groomingServices.map((service, i) => (
                <div className="service" key={`grooming-${i}`}>
                  <div className="service-category grooming">
                    Soin/Éducation
                  </div>
                  <p className="service-text service-name">{service.name}</p>
                  <p className="service-text service-description">
                    {service.description}
                  </p>
                  <p className="service-text service-price">
                    À partir de <b>{service.price}€</b>
                  </p>
                </div>
              ))}
            </article>
            <h3>Garde de votre toutou 🏡</h3>
            <article className="services-container">
              {sittingServices.map((service, j) => (
                <div className="service" key={`sitting-${j}`}>
                  <div className="service-category sitting">Garde</div>
                  <p className="service-text service-name">{service.name}</p>
                  <p className="service-text service-description">
                    {service.description}
                  </p>
                  <p className="service-text service-price">
                    À partir de <b>{service.price}€</b>
                  </p>
                </div>
              ))}
            </article>
          </section>
        )}
      </main>
    </>
  );
};

export default Services;
