import express from "express";
import 
    { 
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
    } 
    from "../../controllers/public/profileController.js";

const profileRouter = express.Router();

profileRouter.get('/:id' , getUserInfos);
profileRouter.put('/:id/update-profile' , updateUserInfos);

profileRouter.get('/:id/animals' , getAllAnimals);
profileRouter.get('/:id/animals/:animalId' , getAnimalInfos);
profileRouter.post('/:id/create-animal' , createAnimal);
profileRouter.put('/:id/animals/:animalId/update-animal' , updateAnimal);
profileRouter.delete('/:id/animals/:animalId' , deleteAnimal);
profileRouter.delete('/:id/animals' , deleteAllAnimals);

profileRouter.get('/:id/bookings' , getAllBookings);
profileRouter.get('/:id/bookings/:bookingId' , getBookingDetails);
profileRouter.put('/:id/bookings/:bookingId' , updateBooking);
profileRouter.delete('/:id/bookings/:bookingId' , cancelBooking);

export default profileRouter;