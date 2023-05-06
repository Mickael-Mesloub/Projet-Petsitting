import express from "express";
import {
  getAllServices,
  getServiceDetails,
  getAllArticles,
  getArticle,
  createBooking,
} from "../../controllers/public/publicController.js";

const publicRouter = express.Router();

publicRouter.get("/services", getAllServices);
publicRouter.get("/services/:serviceId", getServiceDetails);
publicRouter.get("/news", getAllArticles);
publicRouter.get("/news/:articleId", getArticle);
publicRouter.post("/bookings/:id/create-booking", createBooking);

export default publicRouter;
