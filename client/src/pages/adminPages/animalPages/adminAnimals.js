import { getMethod } from "../../../helpers/fetch.js";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../store/slices/user/userSlice';
import verifyToken from '../../../helpers/VerifyToken';
import { Link } from "react-router-dom";
import Header from "../../../components/Header.js";
import AdminLinks from "../../../components/AdminLinks.js";
import { animalSize } from "../../../helpers/utils.js";

const Animals = () => {

    const [animals, setAnimals] = useState([]);
    const [visible, setVisible] = useState(false);
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        if (user && !user.logged) {
            const token = localStorage.getItem('jwt')
            verifyToken('http://localhost:9900/verify-token', token, dispatch, loginUser);
        }

    }, [])

    useEffect(() => {
        getMethod('http://localhost:9900/admin/animals')
            .then((data) => {
                console.log(data.animals)
                setAnimals(data.animals)
            })
            .catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        console.log(visible);
    }, [visible])

    const displayImages = () => {
        setVisible(!visible)
    }

    return (
        <>
            <Header />
            <AdminLinks />
            <h1>Animaux</h1>
            {animals.length === 0 ?
                <div>Aucun animal trouvé</div>
                :
                <div>
                    {animals.map((animal, i) =>
                        <div key={i}>
                            <div>Nom : {animal.name}</div>
                            <div>Présentation : {animal.description}</div>
                            <div>Taille : {animalSize(animal.size)} </div>
                            { animal.images.length === 0 ?
                                <div>Aucune image téléchargé pour cet animal</div>
                            :
                                <>
                                    <button onClick={displayImages}>{visible ? "Masquer" : "Afficher"} images</button>
                                    
                                    {visible &&
                                        <div>
                                            { animal.images.map((image, i) =>
                                                <Link key={i} to={`http://localhost:9900/${image}`}>${image}</Link>
                                            )}
                                        </div>    
                                            
                                    }
                                </>
                            }                            
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Animals;