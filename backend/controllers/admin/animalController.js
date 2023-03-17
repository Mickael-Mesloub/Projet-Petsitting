import animalModel from "../../models/animalModel.js";

export const getAllAnimals = async (req, res) => {

    try {
        const animals = await animalModel.find({});

        if(!animals) res.status(404).json({error: `Animaux introuvables.`})

        res.status(200).json({ animals })

    } catch (error) {
        res.status(500).json({ error: `Une erreur serveur est survenue. ${error.message}. Veuillez réessayer.` })
    }
}