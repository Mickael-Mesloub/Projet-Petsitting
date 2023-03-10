import express from 'express';
import { createService } from '../../controllers/admin/serviceController.js';

const serviceRouter = express.Router();

serviceRouter.post('/create-service' , createService)

export default serviceRouter;