import express from "express";
import { getAllServices, getServiceDetails } from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/services' , getAllServices);
publicRouter.get('/services/:id' , getServiceDetails);

export default publicRouter;