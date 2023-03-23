import express from "express";
import 
    { 
        getAllServices, 
        getServiceDetails, 
        getAllArticles, 
        createBooking, 
    } 
    from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/services' , getAllServices);
publicRouter.get('/services/:id' , getServiceDetails);
publicRouter.get('/news' , getAllArticles);
publicRouter.post('/bookings/:id/create-booking' , createBooking);




export default publicRouter;