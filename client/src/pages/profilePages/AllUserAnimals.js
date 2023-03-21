import { getMethod } from "../../helpers/fetch";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from '../../components/Header';
import './styles/profile.scss';
import verifyToken from "../../helpers/VerifyToken";
import { loginUser } from "../../store/slices/user/userSlice";

const UserAnimals = () => {

    const [profile, setProfile] = useState([])

    const dispatch = useDispatch();
    const {user} = useSelector(state => state);
    const { userId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        getMethod(`http://localhost:9900/profile/${userId}`, token)
            .then((data) => {setProfile(data)})
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        console.log(user.isLogged);
        const token = localStorage.getItem('jwt')
        if(token && !user.isLogged) {
            verifyToken('http://localhost:9900/verify-token', token)
                .then((data) => {
                    console.log(data.user);
                    dispatch(loginUser(data.user))
                })
                .catch((error) => console.log(error))        
        }
    }, [user])

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
                                <div>{animal.size}</div>
                                <div className="animals-images-box">
                                    {animal.images.length > 0 ? animal.images.map((image, i) => 
                                        <div key={i} className="animal-image">
                                            <img src={`http://localhost:9900/${image}`} alt="" />
                                            
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