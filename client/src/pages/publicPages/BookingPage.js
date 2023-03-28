import Header from "../../components/Header"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getMethod } from "../../helpers/fetch";
import { useParams } from "react-router-dom";
import { loginUser } from "../../store/slices/user/userSlice";

const Booking = () => {

    const [animals, setAnimals] = useState([]);
    const [services, setServices] = useState([]);
    const [animalBookings, setAnimalBookings] = useState([])
    const {userId} = useParams();
    const { user } = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if(token && !user.isLogged) {
            getMethod( `${process.env.REACT_APP_BACKEND_URL}/verify-token`)
                .then((data) => {dispatch(loginUser(data.user))})
                .catch((error) => console.log(error))        
        }
    }, []);

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/animals`)
            .then((data) => {
                console.log(data);
                setAnimals(data.animal)
                setAnimalBookings(data.bookings)
            })
            .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        getMethod(`${process.env.REACT_APP_BACKEND_URL}/services`)
        .then((data) => setServices(data))
        .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        console.log(services);
    },[])

    return ( 
        <>
            <Header />
            <h1>Réserver</h1>
            
        </>
    )
}

export default Booking;