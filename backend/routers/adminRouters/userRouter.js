import express from 'express';
import { getAllUsers, getUserDetails } from '../../controllers/admin/userController.js';

const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserDetails);

export default userRouter;