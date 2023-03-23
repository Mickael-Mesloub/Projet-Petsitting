import userModel from "../../models/userModel.js";
import animalModel from "../../models/animalModel.js";
import bookingModel from "../../models/bookingModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json({message: "Voici la liste des utilisateurs : ", users});
    }
    catch(error) {
        res.status(400).json({error: "Utilisateurs introuvables."});
    }  
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const animals = await animalModel.find({owner: user._id});
        const promises = animals.map((animal) => {
            return bookingModel.find({ animal: animal._id });   
        });
        const bookings = await Promise.all(promises);
        const animalsBookings = bookings.flat();

        res.status(200).json({message: "Voici les détails de l'utilisateur, ses animaux et ses réservations : ", user, animals, animalsBookings});
    }
    catch(error) {
        res.status(400).json({error: "Utilisateur introuvable."});
    }
}

export const deleteUser = async (req, res) => {
    const user = await userModel.findById(req.params.id);
    
    if(!user) return res.status(404).json({error: "Utilisateur introuvable."});

    userModel.findByIdAndDelete(req.params.id)
        .then((user) => res.status(204).send())
        .catch((error) => res.status(500).json({error: `Une erreur est survenue et l'utilisateur n'a pas pu être supprimé : ${error.message}`  }))
}

export const deleteAllUsers = (req, res) => {
    userModel.deleteMany()
        .then((users) => {
            console.log("Tous les utilisateurs ont été supprimés!");
            return res.status(204).send()
        })
        .catch(error => {
            console.log("Une erreur est survenue lors de la supression des utilisateurs.");
            return res.status(500).json({ error: ` Une erreur est survenue et les utilisateurs n'ont pas pu être supprimés : ${error.message}` })
        })
}