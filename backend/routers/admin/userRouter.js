import express from 'express';
import { getAllUsers, getUserDetails, deleteUser, deleteAllUsers } from '../../controllers/admin/userController.js';

const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserDetails);
userRouter.delete('/users/:id' , deleteUser);
userRouter.delete('/users' , deleteAllUsers);

export default userRouter;