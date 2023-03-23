import express from "express";
import { getAllAnimals, getUserAnimals } from './../../controllers/admin/animalController.js';

const animalRouter = express.Router();

animalRouter.get('/animals', getAllAnimals);
animalRouter.get('/animals/:userId', getUserAnimals);

export default animalRouter;