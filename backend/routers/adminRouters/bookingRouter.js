import express from "express";
import { getAllBookings, getBooking, cancelUserBooking } from "../../controllers/admin/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get('/bookings' , getAllBookings);
bookingRouter.get('/bookings/:bookingId' , getBooking);
bookingRouter.delete('/bookings/:bookingId' , cancelUserBooking);

export default bookingRouter;