import { copyFiles } from "../../utils/utils.js";
import fs from "fs";
import formidable from "formidable";
import animalModel from "../../models/animalModel.js";
import userModel from "../../models/userModel.js";
import bookingModel from "../../models/bookingModel.js";
import bcrypt from "bcrypt";

// ********** USER **********

export const getUserInfos = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Cet utilisateur n'existe pas." });
    }

    const animals = await animalModel.find({ owner: userId });
    return res.status(200).json({ user, animals });
  } catch (error) {
    return res.status(400).json({ error: "Utilisateur introuvable." });
  }
};

export const updateUserInfos = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    const form = formidable();
    form.parse(req, async (error, fields, files) => {
      if (error)
        return res.status(500).json({
          error: `Une erreur est survenue : ${error.message}. Veuillez réessayer.`,
        });

      let newPassword = user.password;
      // Vérifiez si un nouveau mot de passe a été fourni
      if (fields.password) {
        // Générer un salt
        const salt = await bcrypt.genSalt(10);
        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(fields.password, salt);
        // Mettre à jour le mot de passe de l'utilisateur
        newPassword = hashedPassword;
      }

      let newAvatar;
      if (files && files.file) {
        newAvatar = await copyFiles(files.file ?? "", "images");
      }

      // Mettre à jour les autres informations de l'utilisateur
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          firstName: fields.firstName || user.firstName,
          lastName: fields.lastName || user.lastName,
          phone: fields.phone || user.phone,
          email: fields.email || user.email,
          password: newPassword,
          avatar: newAvatar ? newAvatar[0] : user.avatar,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `Votre profil a été modifié avec succès!`,
        updatedUser: updatedUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Utilisateur introuvable." });
  }
};

// ********** ANIMAL **********

export const createAnimal = async (req, res) => {
  try {
    const userId = req.userId;
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).json({
          error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être téléchargé(s) : ${error.message}. Veuillez réessayer.`,
        });
      }

      const images = await copyFiles(files.file ?? "", "images/animals");

      await animalModel
        .create({
          owner: userId,
          name: fields.name,
          description: fields.description,
          size: fields.size,
          images,
        })
        .then((animal) => {
          return res
            .status(200)
            .json({ message: "Nouvel animal créé avec succès!", animal });
        })
        .catch((error) => {
          return res.status(500).json({
            error: `Une erreur est survenue et l'animal n'a pas pu être créé : ${error.message}. Veuillez réessayer.`,
          });
        });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: `Une erreur est survenue et l'animal n'a pas pu être créé : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const getAllAnimals = async (req, res) => {
  try {
    const userId = req.userId;
    const animals = await animalModel.find({ owner: userId });
    return res.status(200).json(animals);
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et l'animal n'a pas pu être affiché : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const getAnimalInfos = async (req, res) => {
  try {
    const animal = await animalModel.findById(req.params.animalId);

    if (!animal) {
      return res.status(404).json({ error: "Animal inexistant." });
    }

    let bookings = await bookingModel.find({ animal: req.params.animalId });

    if (bookings.length > 0) {
      bookings = await bookingModel
        .find({ animal: req.params.animalId })
        .populate("service");
    }

    return res.status(200).json({ animal, bookings });
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et l'animal n'a pas pu être affiché : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).json({
          error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être téléchargé(s) : ${error.message}. Veuillez réessayer.`,
        });
      }

      const animal = await animalModel.findById(req.params.animalId);

      if (!animal) {
        return res.status(404).json({ error: "Cet animal n'existe pas." });
      }

      // Supprimer les images sélectionnées
      const deletedImages = fields.deleteImages || [];

      for (const image of deletedImages) {
        fs.unlink(`public/${image}`, (error) => {
          if (error && error.code !== "ENOENT") {
            return res.status(500).json({
              error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`,
            });
          }
        });
      }

      // Ajouter les nouvelles images et mettre à jour la base de données
      const images = await copyFiles(files.file ?? [], "images/animals");
      const updatedImages = animal.images
        .filter((i) => !deletedImages.includes(i))
        .concat(images);

      animal.name = fields.name || animal.name;
      animal.description = fields.description || animal.description;
      animal.images = updatedImages;
      animal
        .save()
        .then((animal) => {
          return res.status(201).json({
            message:
              "Les informations de l'animal ont été modifiées avec succès!",
            animal,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error: `Une erreur est survenue et les informations de l'animal n'ont pas pu être modifiées : ${error.message}. Veuillez réessayer.`,
          });
        });
    });
  } catch (error) {
    return res.status(400).json({
      error: `Une erreur est survenue et les informations de l'animal n'ont pas pu être modifiées : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await animalModel.findById(req.params.animalId);

    if (!animal) {
      return res.status(404).json({ error: "Cet animal est introuvable." });
    }

    const bookings = await bookingModel.find({ animal: req.params.animalId });

    animalModel
      .findByIdAndDelete(req.params.animalId)
      .then((deletedAnimal) => {
        if (!deletedAnimal) {
          return res.status(404).json({ error: "Animal introuvable." });
        }

        if (bookings && bookings.length !== 0) {
          const deletePromises = bookings.map((booking) => {
            return bookingModel.findByIdAndDelete(booking._id);
          });
          Promise.all(deletePromises);
        }

        deletedAnimal.images &&
          deletedAnimal.images.forEach((image) => {
            fs.unlink(`public/${image}`, (error) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`,
                });
              }
              console.log("Fichier(s) supprimé(s) avec succès!");
            });
          });

        return res.status(204).send();
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          error: `Une erreur est survenue et l'animal n'a pas pu être supprimé : ${error.message}. Veuillez réessayer.`,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et l'animal n'a pas pu être supprimé : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const deleteAllAnimals = (req, res) => {
  animalModel
    .deleteMany()
    .then((animal) => {
      fs.readdir("public/images/animals", (error, files) => {
        if (error)
          return res.status(500).json({ error: "Aucun fichier trouvé." });

        files.forEach((file) => {
          fs.unlink(`public/images/animals/${file}`, (error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`,
              });
            }
          });
        });
      });
      console.log("Tous les animaux ont été supprimés!");
      return res.status(204).send();
    })
    .catch((error) => {
      console.log(
        "Une erreur est survenue lors de la suppression des animaux."
      );
      return res.status(500).json({
        error: `Une erreur est survenue et les animaux pas pu être supprimés : ${error.message}. Veuillez réessayer.`,
      });
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
    return res.status(200).json(bookings.flat());
  } catch (error) {
    return res.status(400).json({ error: "Réservations introuvables." });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Réservation inexistante." });
    }

    const animal = await animalModel.findById(booking.animal);

    if (!animal) {
      return res.status(404).json({
        error: "L'animal associé à cette réservation n'a pas été trouvé.",
      });
    }

    booking.animal = animal;

    return res.status(200).json({ booking });
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et les réservations n'ont pas pu s'afficher : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.bookingId);
    const { date, startTime, endTime, animal, service } = req.body;

    if (!booking) {
      return res.status(404).json({ error: "Cette réservation n'existe pas." });
    }

    bookingModel
      .findByIdAndUpdate(
        req.params.bookingId,
        {
          date: date || booking.date,
          startTime: startTime || booking.startTime,
          endTime: endTime || booking.endTime,
          animal: animal || booking.animal,
          service: service || booking.service,
        },
        { new: true }
      )
      .then((booking) =>
        res
          .status(201)
          .json({ message: "Réservation modifiée avec succès!", booking })
      )
      .catch((error) =>
        res.status(500).json({
          error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.`,
        })
      );
  } catch (error) {
    return res.status(500).json({
      error: `Une erreur est survenue et la réservation n'a pas pu être modifiée : ${error.message}. Veuillez réessayer.`,
    });
  }
};

export const cancelBooking = async (req, res) => {
  const booking = await bookingModel.findById(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ error: "Cette réservation n'existe pas." });
  }

  bookingModel
    .findByIdAndDelete(req.params.bookingId)
    .then((booking) => {
      console.log("Votre réservation a été annulée.");
      res.status(204).send();
    })
    .catch((error) =>
      res.status(500).json({
        error: `Une erreur est survenue et la réservation n'a pas pu être annulée : ${error.message}. Veuillez réessayer.`,
      })
    );
};

export const deleteAllBookings = (req, res) => {
  bookingModel
    .deleteMany()
    .then((booking) => {
      console.log("Toutes les réservations ont été annulées!");
      return res.status(204).send();
    })
    .catch((error) => {
      console.log(
        "Une erreur est survenue lors de la supression des réservations."
      );
      return res.status(500).json({
        error: `Une erreur est survenue et les réservations n'ont pas pu être annulées : ${error.message}. Veuillez réessayer.`,
      });
    });
};
