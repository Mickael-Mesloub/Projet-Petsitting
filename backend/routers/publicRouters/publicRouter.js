import express from "express";
import { getUserInfos, updateUserInfos, getAllServices, getServiceDetails } from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/user/:id' , getUserInfos);
publicRouter.put('/user/:id' , updateUserInfos);

publicRouter.get('/services' , getAllServices);
publicRouter.get('/services/:id' , getServiceDetails);


export default publicRouter;