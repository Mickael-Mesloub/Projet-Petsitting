import { getMethod } from "../../../helpers/fetch.js";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../store/slices/user/userSlice';
import verifyToken from '../../../helpers/VerifyToken';


const Animals = () => {

    const [animals, setAnimals] = useState([])
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();


    const token = localStorage.getItem('jwt')

    useEffect(() => {

        if(token && !user.logged) {
            verifyToken('http://localhost:9900/verify-token', token, dispatch, loginUser);
        }

    }, [])

    useEffect(() => {
        getMethod('http://localhost:9900/admin/animals', token)
            .then((data) => {
                console.log(data.animals)
                setAnimals(data.animals)
            })
            .catch((error) => console.log(error))
            
    }, [])
    
    return (
        <>
            <h1>Animaux</h1>
            {animals.length === 0 ?
                <div>Aucun animal trouvé</div>
                :
                <div>
                {animals.map((animal, i) => 
                <p key={i}>{animal.name}</p>)
                }
                </div>
            }   
            
        </>
    )

}

export default Animals;