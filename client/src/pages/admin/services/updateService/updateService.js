import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod, putMethod } from "../../../../helpers/fetch";
import Header from "../../../../components/header/Header.js";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";


const UpdateService = () => {

    // Récupérer l'id de l'article 
    // Faire un fetch avec l'id de l'article
    // Afficher les infos de l'article

    const [service, setService] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);    
    const [visible, setVisible] = useState(true);
    const [selectedInput, setSelectedInput] = useState(true)
    const { serviceId } = useParams();
    

    const handleRadioChange = (event) => {
        setSelectedInput(!selectedInput);
        setVisible(event.target.value);
    };

    useEffect(() => {
        console.log(visible);
    },[visible])

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/services/${serviceId}`)
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

        putMethod(`${process.env.REACT_APP_BACKEND_URL}/admin/services/${serviceId}`, updatedService)
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
                        <input type="radio" name="yes" value="true" checked={selectedInput} onChange={handleRadioChange} /><label htmlFor="true">Oui</label>
                    </div>
                    <div>
                        <input type="radio" name="no" value="false" checked={!selectedInput} onChange={handleRadioChange} /><label htmlFor="false">Non</label>
                    </div>
                </fieldset>
                
                <input type="submit" value="Modifier"/>
            </form>
        </>
    )

}

export default UpdateService;