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

export const deleteUser = async (req, res) => {
    const user = await userModel.findById(req.params.id)
    
    if(!user) return res.status(404).json({error: "Utilisateur introuvable."})

    userModel.findByIdAndDelete(req.params.id)
        .then((user) => res.status(204).send())
        .catch((err) => res.status(500).json({error: "Une erreur est survenue et le service n'a pas pu être supprimé. Veuillez réessayer."}))
}

export const deleteAllUsers = (req, res) => {
    userModel.deleteMany()
        .then((users) => {
            console.log("Tous les utilisateurs ont été supprimés!");
            return res.status(204).send()
        })
        .catch(err => {
            console.log("Une erreur est survenue lors de la supression des utilisateurs.");
            return res.status(500).json({ error: "Une erreur est survenue lors de la suppression des utilisateurs." })
        })
}