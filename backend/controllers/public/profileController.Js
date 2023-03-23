import { copyFile, copyFiles } from "../../utils/utils.js";
import fs from "fs";
import formidable from "formidable";
import animalModel from "../../models/animalModel.js";
import userModel from "../../models/userModel.js";
import bookingModel from "../../models/bookingModel.js";

// ********** USER **********

export const getUserInfos = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) return res.status(404).json({ error: "Utilisateur introuvable." });
        if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à consulter ce profil." });

        const user = await userModel.findById(req.params.id);
        const animals = await animalModel.find({ owner: userId });
        res.status(200).json({ user, animals });
    }
    catch (error) {
        res.status(400).json({ error: "Utilisateur introuvable." });
    };
};

export const updateUserInfos = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });
        if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à modifier ce profil." });

        const form = formidable();
        form.parse(req, async (error, fields, files) => {

            if (error) return res.status(500).json({ error: `Une erreur est survenue : ${error.message}. Veuillez réessayer.` });

            let avatar;
            const { isAdmin, defaultAvatar } = req.body;

            if (files && files.file) {
                console.log(files.file);
                avatar = copyFile(files.file !== undefined ? files.file : "");
            } else {
                avatar = isAdmin ? 'static-images/admin.png' : defaultAvatar;
            };

            await userModel.findByIdAndUpdate(req.params.id,
                {
                    firstName: fields.firstName || user.firstName,
                    lastName: fields.lastName || user.lastName,
                    phone: fields.phone || user.phone,
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
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error: `Une erreur est survenue et votre profil n'a pas pu être modifié : ${error.message}. Veuillez réessayer.` });
                });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Utilisateur introuvable." });
    };
};

// ********** ANIMAL **********

export const createAnimal = async (req, res) => {
    try {
        const userId = req.userId;

        if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à consulter ce profil." });

        const form = formidable({ multiples: true });
        form.parse(req, async (error, fields, files) => {

            if (error) {
                return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être téléchargé(s) : ${error.message}. Veuillez réessayer.` });
            };

            const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/animals');

            animalModel.create({
                owner: userId,
                name: fields.name,
                description: fields.description,
                size: fields.size,
                images
            })
                .then((animal) => res.status(200).json({ message: "Nouvel animal créé avec succès!", animal }))
                .catch((error) => res.status(500).json({ error: `Une erreur est survenue et l'animal n'a pas pu être créé : ${error.message}. Veuillez réessayer.` }));
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: `Une erreur est survenue et l'animal n'a pas pu être créé : ${error.message}. Veuillez réessayer.` });
    };
};

export const getAllAnimals = async (req, res) => {
    try {
        const userId = req.userId;

        if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à consulter ce profil." });

        const animals = await animalModel.find({ owner: userId });
       return res.status(200).json(animals);
    } catch (error) {
       return res.status(500).json({ error: `Une erreur est survenue et l'animal n'a pas pu être affiché : ${error.message}. Veuillez réessayer.` });
    };
};

export const getAnimalInfos = async (req, res) => {
    try {

        const animal = await animalModel.findById(req.params.animalId);

        if (!animal) {
            return res.status(404).json({ error: "Animal inexistant." });
        };

        const bookings = await bookingModel.find({ animal: req.params.animalId })

        if (bookings.length === 0) {
            return res.status(404).json({ error: "Aucune réservation n'a été faite pour cet animal." })
        }

        return res.status(200).json({ animal, bookings });
    } catch (error) {
        return res.status(500).json({ error: `Une erreur est survenue et l'animal n'a pas pu être affiché : ${error.message}. Veuillez réessayer.` });
    };
};

export const updateAnimal = async (req, res) => {
    try {
        const userId = req.userId;

        if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à consulter ce profil." });

        const form = formidable({ multiples: true });
        form.parse(req, async (error, fields, files) => {

            if (error) {
                return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être téléchargé(s) : ${error.message}. Veuillez réessayer.` });
            };

            const animal = await animalModel.findById(req.params.animalid);

            if (!animal) {
                return res.status(404).json({ error: "Cet animal n'existe pas." });
            };

            // Supprimer les images sélectionnées
            const deletedImages = fields.deleteImages || [];

            for (const image of deletedImages) {
                fs.unlink(`public/${image}`, (error) => {

                    if (error && error.code !== "ENOENT") {
                        return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.` });
                    };

                });
            };

            // Ajouter les nouvelles images et mettre à jour la base de données
            const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/animals');
            const updatedImages = animal.images.filter((i) => !deletedImages.includes(i)).concat(images);

            animal.title = fields.title || animal.title
            animal.content = fields.content || animal.content
            animal.images = updatedImages
            animal.save()
                .then((animal) => res.status(201).json({ message: "Les informations de l'animal ont été modifiées avec succès!", animal }))
                .catch((error) => res.status(400).json({ error: `Une erreur est survenue et les informations de l'animal n'ont pas pu être modifiées : ${error.message}. Veuillez réessayer.` }));
        });
    } catch (error) {
        return res.status(400).json({ error: `Une erreur est survenue et les informations de l'animal n'ont pas pu être modifiées : ${error.message}. Veuillez réessayer.` });
    };
};

export const deleteAnimal = (req, res) => {
    const userId = req.userId;
    if (userId !== req.params.id) return res.status(401).json({ error: "Vous n'êtes pas autorisé(e) à consulter ce profil." });
    animalModel.findByIdAndDelete(req.params.animalid)
        .then(deletedAnimal => {

            if (!deletedAnimal) {
                return res.status(500).json({ error: "Animal introuvable." });
            }

            console.log(deletedAnimal.images);
            deletedAnimal.images.forEach((image) => {
                fs.unlink(`public/${image}`, (error) => {

                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.` });
                    }
                    console.log("Fichier(s) supprimé(s) avec succès!");
                });
            });
            console.log("deleted");
            console.log(deletedAnimal);

            return res.status(204).send();
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: `Une erreur est survenue et l'animal n'a pas pu être supprimé : ${error.message}. Veuillez réessayer.` });
        });
};

export const deleteAllAnimals = (req, res) => {

    animalModel.deleteMany()
        .then((animal) => {
            console.log(animal);
            fs.readdir('public/images/animals', (error, files) => {
                console.log(files);

                if (error) return res.status(500).json({ error: "Aucun fichier trouvé." });

                files.forEach((file) => {
                    console.log(file);
                    fs.unlink(`public/images/animals/${file}`, (error) => {

                        if (error) {
                            console.log(error);
                            return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.` });
                        };
                    });
                });
            });
            console.log("Tous les animaux ont été supprimés!");
            return res.status(204).send();
        })
        .catch(error => {
            console.log("Une erreur est survenue lors de la suppression des animaux.");
            return res.status(500).json({ error: `Une erreur est survenue et les animaux pas pu être supprimés : ${error.message}. Veuillez réessayer.` });
        });
};

// BOOKINGS 

export const getAllBookings = async (req, res) => {
    try {
        const animals = await animalModel.find({ owner: req.params.id });
        const promises = animals.map((animal) => {
            return bookingModel.find({ animal: animal._id });   
        });
        const bookings = await Promise.all(promises);
        res.status(200).json(bookings.flat());
    } catch (error) {
        res.status(400).json({ error: "Réservations introuvables." });
    };
};


export const getBookingDetails = async (req, res) => {
    try {
        console.log(req.params.bookingId);
        const booking = await bookingModel.findById(req.params.bookingId);
        console.log(booking);

        if (!booking) {
            return res.status(404).json({ error: "Réservation inexistante." });
        };

        return res.status(200).json({booking});
    } catch (error) {
        return res.status(500).json({ error: `Une erreur est survenue et les réservations n'ont pas pu s'afficher : ${error.message}. Veuillez réessayer.` });
    };
};

export const updateBooking = async (req, res) => {
    try {
        const booking = await bookingModel.findById(req.params.bookingId);
        const { date, startTime, endTime, animal, service } = req.body;

        if (!booking) {
            return res.status(404).json({ error: "Cette réservation n'existe pas." });
        };

        bookingModel.findByIdAndUpdate(req.params.bookingId,
            {
                date: date || booking.date,
                startTime: startTime || booking.startTime,
                endTime: endTime || booking.endTime,
                animal: animal || booking.animal,
                service: service || booking.service
            }, 
            { new: true })
            .then((booking) => res.status(201).json({ message: "Réservation modifiée avec succès!", booking }))
            .catch((error) => res.status(500).json({ error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.` }));
    } catch (error) {
        return res.status(500).json({ error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.` });
    };
};

export const cancelBooking = async (req, res) => {
    const booking = await bookingModel.findById(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({ error: "Cette réservation n'existe pas." });
    };

    bookingModel.findByIdAndDelete(req.params.bookingId)
        .then((booking) => {
            console.log("Votre réservation a été annulée.");
            res.status(204).send()
        })
        .catch((error) => res.status(500).json({ error: `Une erreur est survenue et la réservation n'a pas pu être annulée : ${error.message}. Veuillez réessayer.` }));

};

export const deleteAllBookings = (req, res) => {
    bookingModel.deleteMany()
        .then((booking) => {
            console.log("Toutes les réservations ont été annulées!");
            return res.status(204).send();
        })
        .catch(error => {
            console.log("Une erreur est survenue lors de la supression des réservations.");
            return res.status(500).json({ error: `Une erreur est survenue et les réservations n'ont pas pu être annulées : ${error.message}. Veuillez réessayer.` });
        });
};