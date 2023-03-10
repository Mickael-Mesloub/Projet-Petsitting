import formidable from "formidable";
import { copyFile } from "../../utils/utils.js";
import userModel from "../../models/userModel.js";
import articleModel from "../../models/articleModel.js";
import serviceModel from "../../models/serviceModel.js";
import bookingModel from "../../models/bookingModel.js";


// ********** USERS **********

export const getUserInfos = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json({message: "OK", user})
    }

    catch(err) {
        res.status(400).json({error: "Utilisateur introuvable."})
    }
};

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


// ********** SERVICES **********

export const getAllServices = async (req, res) => {

    try {

        const services = await serviceModel.find({})
        res.status(200).json(services)

    } catch (err) {
        res.status(400).json({ message: "Services introuvables." })
    }
}

export const getServiceDetails = async (req, res) => {

    try {

        const service = await serviceModel.findById(req.params.id)
        if(!service) {
            return res.status(404).json({error: "Service inexistant."})
        } 
        res.status(200).json(service)

    } catch (err) {
        res.status(400).json({ message: "Service introuvable" })
    }
}


// ********** NEWS **********

export const createArticle = async (req, res) => {

    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            if (err) {
                return res.status(500).json({ erreur: "Un problème est survenu lors du téléchargement de fichiers." })
            }

            const images = await copyFiles(files.file !== undefined ? files.file : []);

            articleModel.create({
                title: fields.title,
                content: fields.content,
                images
            })
                .then((article) => {
                    console.log("CREATION ARTICLE OK");
                    res.status(200).json({ message: "Nouvel article créé avec succès!", article })
                })
                .catch((err) => res.status(500).json({ error: "Une erreur est survenue lors de la création de l'article." }))
        })
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'article." })
    }
}

// ********** BOOKINGS **********

export const createBooking = async (req, res) => {
    
    try {
        const {name, description, price, visible} = req.body;
        serviceModel.create({
            name,
            description,
            price,
            visible
        })
            .then((service) => {
                console.log(`Nouveau service créé : ${service}`);
                res.status(201).json({message: "Un nouveau service a été créé!" , service})
            })
            .catch((error) => {
                res.status(500).json({error: "Une erreur est survenue lors de la création du service."})
            })

    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du service." })
    }
}

export const getAllBookings = async (req, res) => {

    try {

        const services = await serviceModel.find({})
        res.status(200).json(services)

    } catch (err) {
        res.status(400).json({ message: "Services introuvables." })
    }
}

export const getBookingDetails = async (req, res) => {

    try {

        const service = await serviceModel.findById(req.params.id)
        if(!service) {
            return res.status(404).json({error: "Service inexistant."})
        } 
        res.status(200).json(service)

    } catch (err) {
        res.status(400).json({ message: "Service introuvable" })
    }
}

export const updateBooking = async (req, res) => {

    try {
        const service = await serviceModel.findById(req.params.id);
        const {name, description, price, visible} = req.body;

        if(!service) {
            return res.status(404).json({error: "Ce service n'existe pas."})
        }
        
        serviceModel.findByIdAndUpdate(req.params.id, 
        {
            name: name || service.name,
            description: description || service.description,
            price: price || service.price,
            visible: visible || service.visible
        }, {new: true})
            .then((service) => res.status(201).json({message: "Service modifié avec succès!", service}))
            .catch((err) => res.status(400).json({error: "Le service n'a pas pu être modifié."}) )
        
    } catch(err) {
        return res.status(400).json({error: "Le service n'a pas pu être modifié."})
    }
}

export const deleteBooking = async (req, res) => {
    const service = await serviceModel.findById(req.params.id);
    
    if(!service) {
        return res.status(404).json({error: "Ce service n'existe pas."})
    }

    serviceModel.findByIdAndDelete(req.params.id)
        .then((service) => res.status(204).send())
        .catch((err) => res.status(500).json({error: "Le service n'a pas pu être supprimé."}))

}

export const deleteAllBookings = (req, res) => {

    serviceModel.deleteMany()
        .then((service) => {
            
            console.log("Tous les services ont été supprimés!");
            return res.status(204).send()
        })
        .catch(err => {
            console.log("Une erreur est survenue lors de la supression des services.");
            return res.status(500).json({ error: "Une erreur est survenue lors de la suppression des services." })
        })

}
