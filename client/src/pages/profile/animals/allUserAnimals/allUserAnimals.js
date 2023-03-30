import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Header from '../../../../components/header/Header';
import './styles.scss';

const UserAnimals = () => {

    const [profile, setProfile] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
            .then((data) => {setProfile(data)})
            .catch((error) => console.log(error))
    },[])

    console.log(profile);

    return (
        <>  
            <Header />
            <h1>Animaux :</h1>
            {profile.animals && profile.animals.length > 0 ? 
                <> 
                    <div className="animals-container">
                        {profile.animals.map((animal, i) => 
                            <div key={i} className="animals-box">
                                <div><Link to={`/profile/${userId}/animals/${animal._id}`}>{animal.name}</Link> </div>
                                <div>{animal.description}</div>
                                <div className="animals-images-box">
                                    {animal.images.length > 0 ? animal.images.map((image, i) => 
                                        <div key={i} className="animal-image">
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="" />
                                            
                                        </div>
                                    )
                                    :
                                        <div>Aucune image téléchargée</div>
                                    }
                                </div>
                            </div>
                        )}
                        <Link to={`/profile/${userId}/create-animal`}>Ajouter un nouvel animal</Link>
                    </div>
                </>
            :
                <>
                    <p>Aucun animal</p>
                </>
            }
        </>
    )
}

export default UserAnimals;