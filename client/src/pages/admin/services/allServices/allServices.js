import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod } from "../../../../helpers/fetch";
import Header from "../../../../components/header/Header.js";
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
    <>
      <AdminLinks />
      <h1>Services</h1>
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
    </>
  );
};

export default AdminServices;
