import { getMethod, deleteMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Header from '../../components/Header';
import './styles/animal.scss';

const Animal = () => {

/*
************************* AFFICHER LES RESERVATIONS ************************
*/
    const [animal, setAnimal] = useState({});
    const [animalBookings, setAnimalBookings] = useState([])
    const { userId, animalId } = useParams();

    useEffect(() => {
        getMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}`)
            .then((data) => {
                setAnimal(data.animal)
                setAnimalBookings(data.bookings)
            })
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        console.log(animalBookings);
    },[])

    return (
        <>
            <Header />
            
            <main className="animal-main">
                
                <div className="animal-container">
                    <h1>{animal.name}</h1>
                    <div className="animal-description">« {animal.description} »</div>
                    <div className="animal-images-container">
                        {animal.images && animal.images.length > 0 ? animal.images.map((image, i) => 
                            <div key={i} className="animal-image">
                                <img src={`http://localhost:9900/${image}`} alt="" />
                            </div>
                        )
                        :
                            <div>Aucune image téléchargée</div>
                        }
                    </div>
                    <button onClick={() => {
                        if (window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet animal ?")) {
                            deleteMethod(`http://localhost:9900/profile/${userId}/animals/${animalId}`);
                        }
                    }}>Supprimer</button>
                    <Link to={`/profile/${userId}/animals/${animalId}/update-animal`}>Modifier</Link>
                </div>
                
                {animalBookings && animalBookings.length > 0 ? 
                    <div className="animal-bookings-container">
                    {animalBookings.map((booking, i) =>
                        <div className="booking" key={i}>
                            <div>Date : {booking.date}</div>
                            <div>De : {booking.startTime} à {booking.endTime}</div>
                            <div>Prestation réservée: {booking.service.name}</div>
                        </div>
                    )}
                    </div>
                
                :   
                    <div>
                        <div>Aucune prestation n'a été réservée pour cet animal.</div>
                        <div>Pour réserver, c'est par ici : </div>
                        <div><Link to="/booking">Réserver</Link></div>
                    </div>

                }
            </main>
               
        </>
    )

}

export default Animal;
