import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod, putMethod } from "../../../helpers/fetch";
import Header from "../../../components/Header.js";
import AdminLinks from "../../../components/AdminLinks.js";
import { putFormData } from './../../../helpers/fetch';


const AdminServiceDetails = () => {

    // Récupérer l'id de l'article 
    // Faire un fetch avec l'id de l'article
    // Afficher les infos de l'article

    const [service, setService] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);    
    const [visible, setVisible] = useState(true);
    const { serviceId } = useParams();
    

    const handleRadioChange = (event) => {
        setVisible(event.target.value === "yes");
    };

    useEffect(() => {
        console.log(visible);
    },[visible])

    useEffect(() => {
        getMethod(`http://localhost:9900/admin/services/${serviceId}`)
            .then((data) => {setService(data)})
            .catch((error) => console.log(error))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedService = {
            name,
            description,
            price,
            visible
        }

        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('description', description);
        // formData.append('price', price);
        // formData.append('visible', visible);

        putMethod(`http://localhost:9900/admin/services/${serviceId}`, updatedService)
            .then((data) => {
                console.log(data)
                setService(data.service)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        console.log(`SERVICE : ${name}`);
    },[name])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Modifier la prestation</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Titre : </label>
                <input type="text" name="name" placeholder={service.name} onChange={(e) => setName(e.target.value) } />
                <label htmlFor="description">Description : </label>
                <textarea name="description" rows="5" cols="50" placeholder={service.description} onChange={(e) => setDescription(e.target.value) } ></textarea>
                <label htmlFor="price">Prix (en €) : </label>
                <input type="number" name="price" placeholder={`${service.price}€`} onChange={(e) => setPrice(e.target.value) } />
                <fieldset>
                    <legend>Rendre la prestation visible pour les utilisateurs?</legend>
                    <div>
                        <input type="radio" name="yes" value="yes" checked={visible} onChange={handleRadioChange} /><label htmlFor="yes">Oui</label>
                    </div>
                    <div>
                    <input type="radio" name="no" value="no" checked={!visible} onChange={handleRadioChange} /><label htmlFor="no">Non</label>
                    </div>
                </fieldset>
                <input type="submit" value="Modifier"/>
            </form>
        </>
    )

}

export default AdminServiceDetails;