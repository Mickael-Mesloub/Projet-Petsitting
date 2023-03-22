import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMethod } from "../../../helpers/fetch";
import Header from "../../../components/Header.js";
import AdminLinks from "../../../components/AdminLinks.js";

const AdminServiceDetails = () => {

    // Récupérer l'id de l'article 
    // Faire un fetch avec l'id de l'article
    // Afficher les infos de l'article

    const [services, setServices] = useState([]);
    const [visible, setVisible] = useState(true);

    const handleRadioChange = (event) => {
        setVisible(event.target.value === "yes");
    };

    useEffect(() => {
        console.log(visible);
    },[visible])

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod('http://localhost:9900/services/:id', token)
            .then((data) => {
                console.log(data);
                setServices(data)
            })
            .catch((error) => console.log(error))
    },[])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Modifier la prestation</h1>
            <form>
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" />
                <label htmlFor="description">Description : </label>
                <textarea name="description" rows="5" cols="50"></textarea>
                <label htmlFor="price">Prix (en €) : </label>
                <input type="number" name="price"/>
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