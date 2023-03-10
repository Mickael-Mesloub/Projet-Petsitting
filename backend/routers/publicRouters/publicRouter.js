import express from "express";
import { getUserInfos, updateUserInfos } from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get('/user/:id' , getUserInfos);
publicRouter.put('/user/:id' , updateUserInfos);

export default publicRouter;