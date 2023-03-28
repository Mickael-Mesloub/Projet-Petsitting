import express from 'express';
import { createService, getAllServices, getServiceDetails, updateService, deleteService, deleteAllServices } from '../../controllers/admin/serviceController.js';

const serviceRouter = express.Router();

serviceRouter.post('/create-service' , createService);
serviceRouter.get('/services' , getAllServices);
serviceRouter.get('/services/:serviceId' , getServiceDetails);
serviceRouter.put('/services/:serviceId' , updateService);
serviceRouter.delete('/services/:serviceId' , deleteService);
serviceRouter.delete('/services' , deleteAllServices);


export default serviceRouter;