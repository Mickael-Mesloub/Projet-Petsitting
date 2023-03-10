import formidable from "formidable";
import { copyFile } from "../../utils/utils.js";
import userModel from "../../models/userModel.js";
import articleModel from "../../models/articleModel.js";
import serviceModel from "../../models/serviceModel.js";

export const getUserInfos = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json({message: "OK", user})
    }

    catch(err) {
        res.status(400).json({error: "Utilisateur introuvable."})
    }
}

export const updateUserInfos = async (req, res) => {

    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            console.log("pas ok");
        }

        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ message: "Une erreur s'est produite" });
            }

            let avatar;
            const { isAdmin, defaultAvatar } = req.body;
            
            if(files && files.file) {
                avatar = copyFile(files.file !== undefined ? files.file : "");
            } else {
                avatar = isAdmin ? 'static-images/admin.png' : defaultAvatar;
            }

            await userModel.findByIdAndUpdate(req.params.id,
                {
                    firstName: fields.firstName || user.firstName,
                    lastName: fields.lastName || user.lastName,
                    email: fields.email || user.email,
                    password: fields.password || user.password,
                    avatar,
                    isAdmin
                },
                { new: true }
            )
                .then((user) => {
                    res.status(200).json({
                        message: `Votre profil a été modifié avec succès!`,
                        user: user
                    })
                })
                .catch((err) => {
                    res.status(500).json({error: err.message})
                })
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Utilisateur introuvable."});
    }
};