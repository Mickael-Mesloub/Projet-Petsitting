import animalModel from "../../models/animalModel.js";
import bookingModel from "../../models/bookingModel.js";

export const getAllAnimals = async (req, res) => {
    try {
        const animals = await animalModel.find({});

        if(!animals) res.status(404).json({error: `Animaux introuvables.`});

        res.status(200).json({animals});

    } catch (error) {
        res.status(500).json({ error: `Une erreur serveur est survenue et les animaux n'ont pas pu être affichés. ${error.message}. Veuillez réessayer.` });
    };
};

export const getUserAnimals = async (req, res) => {
    try {
        const animals = await animalModel.find({owner: req.params.userId});

        if(!animals) {
            return res.status(404).json({error: "Animaux introuvables."});
        };

        const promises = animals.map((animal) => {
            return bookingModel.find({ animal: animal._id });   
        });
        const bookings = await Promise.all(promises);
        const animalsBookings = bookings.flat();
        res.status(200).json({animals, animalsBookings});  

    } catch (error) {
        res.status(500).json({ error: `Une erreur serveur est survenue et les animaux n'ont pas pu être affichés. ${error.message}. Veuillez réessayer.` });
    };
};