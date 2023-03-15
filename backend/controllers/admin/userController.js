import userModel from "../../models/userModel.js";
import animalModel from "../../models/animalModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json({message: "Voici la liste des utilisateurs : ", users})
    }
    catch(err) {
        res.status(400).json({error: "Utilisateurs introuvables."})
    }  
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const animals = await animalModel.find({owner: user._id})
        res.status(200).json({message: "Voici les détails de l'utilisateur et de ses animaux : ", user, animals})
    }

    catch(err) {
        res.status(400).json({error: "Utilisateur introuvable."})
    }
}