import "../../../../assets/styles/forms.scss";
import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../components/header/Header";

const Booking = () => {
  const { userId, bookingId } = useParams();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    getMethod(
      `${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/bookings/${bookingId}`
    )
      .then((data) => setBooking(data.booking))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(booking);
  }, [booking]);

  return (
    <>
      {booking && (
        <main>
          <h1>
            Réservation du {booking.date} pour {booking.animal.name}{" "}
          </h1>
        </main>
      )}
    </>
  );
};

export default Booking;
