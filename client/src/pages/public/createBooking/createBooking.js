import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMethod } from "../../../helpers/fetch";
import { useParams } from "react-router-dom";
import { loginUser } from "../../../store/slices/user/userSlice";

// En cours de réflexion pour le fonctionnement des réservations...

const Booking = () => {
  const [animals, setAnimals] = useState([]);
  const [services, setServices] = useState([]);
  const [animalBookings, setAnimalBookings] = useState([]);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/verify-token`)
      .then((data) => {
        dispatch(loginUser(data.user));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/profile/animals`)
      .then((data) => {
        console.log(data);
        setAnimals(data.animal);
        setAnimalBookings(data.bookings);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/services`)
      .then((data) => setServices(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(services);
  }, []);

  return (
    <main>
      <h2>Réserver</h2>
    </main>
  );
};

export default Booking;
