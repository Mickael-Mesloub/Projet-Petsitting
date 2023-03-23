import { getMethod, deleteMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from '../../components/Header';
import './styles/animal.scss';

const Animal = () => {

    const [animal, setAnimal] = useState({});
    const { userId, animalId } = useParams();

    useEffect(() => {
        getMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}`)
            .then((data) => {setAnimal(data)})
            .catch((error) => console.log(error))
    },[userId, animalId])

    return (
        <>
            <Header />
            <h1>{animal.name}</h1>
            <div className="animal-container">
                <div className="animal-description">{animal.description}</div>
                <div className="animal-size">{animal.size}</div>
                <div className="animal-images-box">
                    {animal.images && animal.images.length > 0 ? animal.images.map((image, i) => 
                        <div key={i} className="animal-image">
                            <img src={`http://localhost:9900/${image}`} alt="" />
                        </div>
                    )
                    :
                        <div>Aucune image téléchargée</div>
                    }
                </div>
                <button onClick={() => deleteMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}`)}>Supprimer</button>
            </div>
        </>
    )

}

export default Animal;
