import serviceModel from "../../models/serviceModel.js";
import bookingModel from "../../models/bookingModel.js";
import articleModel from "../../models/articleModel.js";
import animalModel from "../../models/animalModel.js";

// ********** SERVICES **********

export const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});

    if (!services) {
      return res.status(404).json({ error: "Aucun service créé." });
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: "Services introuvables." });
  }
};

export const getServiceDetails = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.serviceId);

    if (!service) {
      return res.status(404).json({ error: "Ce service n'existe pas." });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(400).json({ error: "Service introuvable" });
  }
};

// ********** NEWS **********

export const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find({});

    if (!articles) {
      return res.status(404).json({ error: "Aucun article créé." });
    }

    return res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      error: `Articles introuvables : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const getArticle = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.articleId);
    console.log(article);

    if (!article) {
      return res.status(404).json({ error: "Cet article n'existe pas." });
    }

    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({
      error: `Article introuvable : ${error.message}. Veuillez réessayer.`,
    });
  }
};

// ********** BOOKINGS **********

export const createBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const animal = await animalModel.findById(req.body.animal);
    const service = await serviceModel.findById(req.body.service);

    console.log(animal);

    if (!animal) {
      return res.status(404).json({ error: "Cet animal n'existe pas." });
    }

    await bookingModel
      .create({
        service,
        date,
        startTime,
        endTime,
        animal,
      })
      .then((booking) => {
        console.log(`Nouvelle réservation créée : ${booking}`);
        return res
          .status(201)
          .json({ message: "Une nouvelle réservation a été créée!", booking });
      })
      .catch((error) => {
        return res.status(500).json({
          error: `Une erreur est survenue et la réservation n'a pas pu être créée : ${error.message}. Veuillez réessayer.`,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et la réservation n'a pas pu être créée : ${error.message}. Veuillez réessayer.`,
    });
  }
};
