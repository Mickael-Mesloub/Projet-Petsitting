import { copyFile, copyFiles, getUserIdFromToken } from "../../utils/utils.js";
import fs from "fs";
import formidable from "formidable";
import animalModel from "../../models/animalModel.js";
import userModel from "../../models/userModel.js";
import { verifyToken } from '../../middlewares/authMiddleware.js'

// ********** USER **********

export const getUserInfos = async (req, res) => {
    try {
        const userId = req.userId;
        if(!userId) return res.status(404).json({error: "Utilisateur introuvable."})
        const user = await userModel.findById(req.params.id);
        const animals = await animalModel.find({owner: userId});
        res.status(200).json({user, animals});
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

// ********** ANIMAL **********

export const createAnimal = async (req, res) => {
    
    try {
        const userId = req.userId;
        console.log(`USERID ====== ${userId}`);
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            
            if (err) {
                return res.status(500).json({ erreur: "Un problème est survenu lors du téléchargement de fichiers." })
            }

            const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/animals');

            animalModel.create({
                owner: userId,
                name: fields.name,
                description: fields.description,
                size: fields.size,
                images
            })
                .then((animal) => {
                    console.log("CREATION animal OK");
                    res.status(200).json({ message: "Nouvel animal créé avec succès!", animal })
                })
                .catch((err) => res.status(500).json({ error: "Une erreur est survenue lors de la création de l'animal.", message: err.message }))
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Erreur lors de la création de l'animal." })
    }
}

export const getAllAnimals = async (req, res) => {
    try {
        const userID = getUserIdFromToken(req);
        const animals = await animalModel.find({owner: userID});
        
        res.status(200).json(animals)

    } catch (err) {
        res.status(400).json({ message: "Animaux introuvables." })
    }
}

export const getAnimalInfos = async (req, res) => {
    try {
        console.log(req.params.animalid);
        const animal = await animalModel.findById(req.params.animalid);

        if(!animal) {
            return res.status(404).json({error: "Animal inexistant."})
        } 

        res.status(200).json(animal);

    } catch (err) {
        res.status(400).json({ error: "Animal introuvable." })
    }
}

export const updateAnimal = async (req, res) => {
    try {
      const form = formidable({ multiples: true })
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: "Un problème est survenu lors du téléchargement de fichiers." })
        }
        
        const animal = await animalModel.findById(req.params.animalid)
        
        if (!animal) {
          return res.status(404).json({error: "Cet animal n'existe pas."})
        }
        
        // Supprimer les images sélectionnées
        const deletedImages = fields.deleteImages || []
        for (const image of deletedImages) {
            console.log(`PUUUUUUUUUBLICCCCCCCCCC public/${image}`);
          fs.unlink(`public/${image}`, (err) => {
            if (err && err.code !== "ENOENT") {
              return res.status(500).json({error: "La suppression d'image(s) a échoué."})
            }
          })
        }
  
        // Ajouter les nouvelles images et mettre à jour la base de données
        const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/animals')
        const updatedImages = animal.images.filter((i) => !deletedImages.includes(i)).concat(images)
        
        animal.title = fields.title || animal.title
        animal.content = fields.content || animal.content
        animal.images = updatedImages
        animal.save()
          .then((animal) => res.status(201).json({message: "Animal modifié avec succès!", animal}))
          .catch((err) => res.status(400).json({error: "L'animal n'a pas pu être modifié."}))
      })
    } catch (err) {
      return res.status(400).json({error: "L'animal n'a pas pu être modifié."})
    }
  }

export const deleteAnimal = (req, res) => {

    animalModel.findByIdAndDelete(req.params.animalid)
        .then(deletedAnimal => {

            if (!deletedAnimal) {
                return res.status(500).json({ error: "Animal non trouvé." })
            }

            console.log(deletedAnimal.images);
            deletedAnimal.images.forEach((image) => {
                fs.unlink(`public/${image}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Le fichier a été supprimé avec succès!");
                })
            })
            console.log("deleted");
            console.log(deletedAnimal);

            return res.status(204).send()
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "L'animal n'a pas pu être supprimé." });
        })
};

export const deleteAllAnimals = (req, res) => {

    animalModel.deleteMany()
        .then((animal) => {
            console.log(animal);
            fs.readdir('public/images/animals', (err, files) => {
                console.log(files);

                if (err) return res.status(500).json({ error: "Aucun fichier trouvé." });

                files.forEach((file) => {
                    console.log(file);
                    fs.unlink(`public/images/animals/${file}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            })
            console.log("Tous les animaux ont été supprimés!");
            return res.status(204).send()
        })
        .catch(err => {
            console.log("Une erreur est survenue lors de la suppression des animaux.");
            return res.status(500).json({ error: err.message })
        })
}
