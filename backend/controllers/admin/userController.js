import userModel from "../../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        console.log("ok");
        const users = await userModel.find({})
        res.status(200).json({message: "OK", users})
    }
    catch(err) {
        res.status(400).json({error: "Utilisateurs introuvables."})
    }  
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json({message: "OK", user})
    }

    catch(err) {
        res.status(400).json({error: "Utilisateur introuvable."})
    }
}