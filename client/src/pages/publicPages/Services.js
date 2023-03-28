import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getMethod } from "../../helpers/fetch";
import './styles/services.scss'

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/services`)
            .then((data) => setServices(data))
            .catch((error) => console.log(error))
    }, []);

    return (
        <>
            {services && services.length > 0 ?
                <>
                    <Header />
                    <h1>Services</h1>
                    <div className="services-container">
                        {services.map((service, i) =>
                            <>
                                {service.visible &&
                                    <div key={i} className="service">
                                        <div>{service.name}</div>
                                        <div>{service.description}</div>
                                        <div>{service.price}€</div>
                                    </div>
                                }
                            </>
                        )}
                    </div>
                </>
            :
                <div>Aucune prestation n'est disponible pour le moment.</div>
            }
        </>
    );
};

export default Services;