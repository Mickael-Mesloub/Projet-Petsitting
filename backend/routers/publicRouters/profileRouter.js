import express from "express";
import {
  getUserInfos,
  updateUserInfos,
  createAnimal,
  getAllAnimals,
  getAnimalInfos,
  updateAnimal,
  deleteAnimal,
  deleteAllAnimals,
  getAllBookings,
  getBookingDetails,
  updateBooking,
  cancelBooking,
} from "../../controllers/public/profileController.js";

const profileRouter = express.Router();

profileRouter.get("/", getUserInfos);
profileRouter.put("/update-profile", updateUserInfos);

profileRouter.get("/animals", getAllAnimals);
profileRouter.get("/animals/:animalId", getAnimalInfos);
profileRouter.post("/create-animal", createAnimal);
profileRouter.put("/animals/:animalId/update-animal", updateAnimal);
profileRouter.delete("/animals/:animalId", deleteAnimal);
profileRouter.delete("/animals", deleteAllAnimals);

profileRouter.get("/bookings", getAllBookings);
profileRouter.get("/bookings/:bookingId", getBookingDetails);
profileRouter.put("/bookings/:bookingId", updateBooking);
profileRouter.delete("/bookings/:bookingId", cancelBooking);

export default profileRouter;
