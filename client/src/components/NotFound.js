import { Link } from "react-router-dom";
import './componentsStyles/notFound.scss'

const NotFound = () => {
    
    return (

        <>
            <h1 className="not-found-title">ERREUR 404: PAGE NOT FOUND</h1>
            <p>Cette page n'existe pas.</p>
            <p>Revenir à l'accueil : </p>
            <Link to="/">Accueil</Link>
        </>
        

    )

}

export default NotFound;