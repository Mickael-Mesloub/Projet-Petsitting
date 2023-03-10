import articleModel from '../../models/articleModel.js';
import formidable from 'formidable';
import fs from 'fs';
import { copyFiles } from '../../utils/utils.js'

// Fonctions asynchrones: accèdent à la DB donc meilleure gestion des erreurs et exceptions car la requête peut prendre du temps 

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
                .catch((err) => res.status(500).json({ error: err }))
        })
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la création de l'article." })
    }
}

export const getAllArticles = async (req, res) => {

    try {

        const articles = await articleModel.find({})
        res.status(200).json(articles)

    } catch (err) {
        res.status(400).json({ message: err })
    }
}

export const getArticle = async (req, res) => {

    try {

        const article = await articleModel.findOne({ _id: req.params.id })
        res.status(200).json(article)

    } catch (err) {
        res.status(400).json({ message: "Article introuvable" })
    }
}

export const updateArticle = (req, res) => {

    try {
        const form = formidable({ multiples: true })
        form.parse(req, async(err, fields, files) => {
            
            if (err) {
                return res.status(500).json({ erreur: "Un problème est survenu lors du téléchargement de fichiers." })
            }
            
            const article = await articleModel.findById(req.params.id)
            if(!article) {
                return res.status(404).json({error: "Cet article n'existe pas."})
            }
            const updatedImages = article.images.filter((i) => !fields.deleteImages?.includes(i))
            console.log(fields.deleteImages);
            if(!Array.isArray(fields.deleteImages)){
                fields.deleteImages = [fields.deleteImages]
            }
            if(fields.deleteImages) {
                fields.deleteImages.forEach((image) => {
                    fs.unlink(`public/${image}`, (err) => {
                        if(err) {
                            if(err.code !== "ENOENT") {
                                return res.status(500).json({error: "La supression d'image(s) a échoué."})
                            }
                        }
                    })
                })
            }
            const images = await copyFiles(files.file !== undefined ? files.file : []);

            updatedImages.push(...images)
            articleModel.findByIdAndUpdate(req.params.id, {
                title: fields.title,
                content: fields.content,
                images
            }, {new: true})
                .then((article) => res.status(201).json({message: "Article modifié avec succès!", article}))
                .catch((err) => res.status(400).json({error: "L'article n'a pas pu être modifié."}) )
        })
    } catch(err) {
        return res.status(400).json({error: "L'article n'a pas pu être modifié."})
    }
}

export const deleteArticle = (req, res) => {

    console.log(req.params.id);
    articleModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedArticle => {

            if (!deletedArticle) {
                return res.status(500).json({ error: "Article non trouvé." })
            }
            console.log(deletedArticle.images);
            deletedArticle.images.forEach((image) => {
                fs.unlink(`public/${image}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Le fichier a été supprimé avec succès!");
                })
            })
            console.log("deleted");
            console.log(deletedArticle);

            return res.status(204).send()
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "L'article n'a pas pu être supprimé." });
        })
};

export const deleteAllArticles = (req, res) => {

    articleModel.deleteMany()
        .then((data) => {
            console.log(data);
            fs.readdir('public/images', (err, files) => {
                console.log(!files);
                if (err) return res.status(500).json({ error: "Aucun fichier trouvé." })
                files.forEach((file) => {
                    fs.unlink(`public/images/${file}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            })
            console.log("Tous les articles ont été supprimés!");
            return res.status(204).send()
        })


        .catch(err => {
            console.log("Une erreur est survenue lors de la supression des articles.");
            return res.status(500).json({ error: "Une erreur est survenue lors de la supression des articles." })
        })

}