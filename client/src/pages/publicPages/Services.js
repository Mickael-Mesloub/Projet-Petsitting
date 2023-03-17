import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { getMethod } from "../../helpers/fetch";
import './styles/services.scss'

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod('http://localhost:9900/services', token)
            .then((data) => setServices(data))
            .catch((error) => console.log(error))
    },[])

    return (
        <>
            <Header />
            <h1>Services</h1>
            <div className="services-container">
                {services.map((service, i) => 
                <div key={i} className="service">
                    <div>{service.name}</div>
                    <div>{service.description}</div>
                    <div>{service.price}€</div>
                </div>
                )}
            </div>
        </>
    )

}

export default Services;