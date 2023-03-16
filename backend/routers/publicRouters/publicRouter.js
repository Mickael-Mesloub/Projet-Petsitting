import express from "express";
import { getAllServices, getServiceDetails, getAllArticles } from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/services' , getAllServices);
publicRouter.get('/services/:id' , getServiceDetails);
publicRouter.get('/news' , getAllArticles);

export default publicRouter;