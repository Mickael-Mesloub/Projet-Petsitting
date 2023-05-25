import { getMethod } from "../../../../helpers/fetch";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Booking = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    getMethod(`${process.env.REACT_APP_API_URL}/profile/bookings/${bookingId}`)
      .then((data) => setBooking(data.booking))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      {booking && (
        <main>
          <h2>
            Réservation du {booking.date} pour {booking.animal.name}{" "}
          </h2>
        </main>
      )}
    </main>
  );
};

export default Booking;
