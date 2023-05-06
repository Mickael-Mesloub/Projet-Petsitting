import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod } from "../../../../helpers/fetch";

import AdminLinks from "../../../../components/adminLinks/AdminLinks";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_BACKEND_URL}/services`)
      .then((data) => {
        console.log(data);
        setServices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <AdminLinks />
      <h2>Services</h2>
      <div className="services-container">
        {services.map((service, i) => (
          <div key={i} className="service">
            <div>
              <Link to={`/admin/services/${service._id}`}>{service.name}</Link>
            </div>
            <div>{service.description}</div>
            <div>{service.price}€</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminServices;
