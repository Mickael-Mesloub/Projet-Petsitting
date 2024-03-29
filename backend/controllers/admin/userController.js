import userModel from "../../models/userModel.js";
import animalModel from "../../models/animalModel.js";
import bookingModel from "../../models/bookingModel.js";
import fs from "fs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res
      .status(200)
      .json({ message: "Voici la liste des utilisateurs : ", users });
  } catch (error) {
    return res.status(400).json({ error: "Utilisateurs introuvables." });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const animals = await animalModel.find({ owner: user._id });
    const promises = animals.map((animal) => {
      return bookingModel.find({ animal: animal._id });
    });
    const bookings = await Promise.all(promises);
    const animalsBookings = bookings.flat();

    return res.status(200).json({
      message:
        "Voici les détails de l'utilisateur, ses animaux et ses réservations : ",
      user,
      animals,
      animalsBookings,
    });
  } catch (error) {
    return res.status(400).json({ error: "Utilisateur introuvable." });
  }
};

export const deleteUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) return res.status(404).json({ error: "Utilisateur introuvable." });

  userModel
    .findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }

      if (deletedUser.avatar) {
        fs.unlink(`public/${deletedUser.avatar}`, (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              error: `Une erreur est survenue et le fichier n'a pas pu être supprimé : ${error.message}. Veuillez réessayer.`,
            });
          }
          console.log("Fichier supprimé avec succès!");
        });
      }

      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(500).json({
        error: `Une erreur est survenue et l'utilisateur n'a pas pu être supprimé : ${error.message}`,
      });
    });
};

export const deleteAllUsers = (req, res) => {
  userModel
    .deleteMany()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ error: "Aucun utilisateur trouvé." });
      }
      for (const user of users) {
        if (!user.avatar) {
          return res.status(404).json({ error: "Aucun avatar trouvé." });
        }
        fs.unlink(`public/${user.avatar}`, (error) => {
          if (error && error.code !== "ENOENT") {
            return res.status(500).json({
              error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`,
            });
          }
        });
      }
      console.log("Tous les utilisateurs ont été supprimés!");
      return res.status(204).send();
    })
    .catch((error) => {
      console.log(
        "Une erreur est survenue lors de la supression des utilisateurs."
      );
      return res.status(500).json({
        error: ` Une erreur est survenue et les utilisateurs n'ont pas pu être supprimés : ${error.message}`,
      });
    });
};
