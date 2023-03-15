import express from "express";
import { getUserInfos, updateUserInfos, createAnimal, getAllAnimals, getAnimalInfos, updateAnimal, deleteAnimal, deleteAllAnimals } from "../../controllers/public/profileController.js";

const profileRouter = express.Router();

profileRouter.get('/:id' , getUserInfos);
profileRouter.put('/:id' , updateUserInfos);

profileRouter.get('/:id/animals' , getAllAnimals);
profileRouter.get('/:id/animals/:animalid' , getAnimalInfos);
profileRouter.post('/:id/create-animal' , createAnimal);
profileRouter.put('/:id/animals/:animalid' , updateAnimal);
profileRouter.delete('/:id/animals/:animalid' , deleteAnimal);
profileRouter.delete('/:id/animals' , deleteAllAnimals);

export default profileRouter;