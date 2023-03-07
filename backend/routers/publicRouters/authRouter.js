import express from 'express';
import { register, verifyToken, login } from '../../controllers/auth/authController.js';

export const loginRouter = express.Router();
export const registerRouter = express.Router();
export const verifyTokenRouter = express.Router();

loginRouter.post('/' , login);
registerRouter.post('/', register);
verifyTokenRouter.get('/', verifyToken);