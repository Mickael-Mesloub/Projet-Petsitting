import express from "express";
import { getAllAnimals } from './../../controllers/admin/animalController.js';

const animalRouter = express.Router();

animalRouter.get('/animals', getAllAnimals);

export default animalRouter;