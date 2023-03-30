import { useState, useEffect } from "react";
import Header from "../../../../components/header/Header.js";
import AdminLinks from "../../../../components/adminLinks/AdminLinks.js";

const CreateService = () => {

    const [visible, setVisible] = useState(true);

    const handleRadioChange = (event) => {
        setVisible(event.target.value === "yes");
    };

    useEffect(() => {
        console.log(visible);
    },[visible])

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Créer une nouvelle prestation</h1>
            <form>
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" />
                <label htmlFor="description">Description : </label>
                <textarea name="description" rows="5" cols="50"></textarea>
                <label htmlFor="price">Prix (en €) : </label>
                <input type="number" name="price"/>
                <fieldset>
                    <legend>La prestation doit-elle être visible pour les utilisateurs?</legend>
                    <div>
                        <input type="radio" name="yes" value="yes" checked={visible} onChange={handleRadioChange} /><label htmlFor="yes">Oui</label>
                    </div>
                    <div>
                    <input type="radio" name="no" value="no" checked={!visible} onChange={handleRadioChange} /><label htmlFor="no">Non</label>
                    </div>
                </fieldset>
                
                <input type="submit" value="Créer"/>
            </form>
        </>
    )

}

export default CreateService;