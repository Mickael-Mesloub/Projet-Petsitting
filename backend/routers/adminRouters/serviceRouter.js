import express from 'express';
import { createService, getAllServices, getServiceDetails, updateService, deleteService, deleteAllServices } from '../../controllers/admin/serviceController.js';

const serviceRouter = express.Router();

serviceRouter.post('/create-service' , createService);
serviceRouter.get('/services' , getAllServices);
serviceRouter.get('/services/:id' , getServiceDetails);
serviceRouter.put('/services/:id' , updateService);
serviceRouter.delete('/services/:id' , deleteService);
serviceRouter.delete('/services' , deleteAllServices);


export default serviceRouter;