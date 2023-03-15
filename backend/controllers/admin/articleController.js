import articleModel from '../../models/articleModel.js';
import formidable from 'formidable';
import fs from 'fs';
import { copyFiles } from '../../utils/utils.js'

export const createArticle = async (req, res) => {

    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            if (err) {
                return res.status(500).json({ error: "Un problème est survenu lors du téléchargement de fichiers." })
            }

            const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/news');

            articleModel.create({
                title: fields.title,
                content: fields.content,
                images
            })
                .then((article) => {
                    console.log("CREATION ARTICLE OK");
                    res.status(201).json({ message: "Nouvel article créé avec succès!", article })
                })
                .catch((err) => res.status(500).json({ error: "Une erreur est survenue lors de la création de l'article." }))
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
        res.status(500).json({ error: "Une erreur serveur est survenue. Les articles n'ont pas pu être récupérés. Veuillez réessayer ultérieurement." })
    }
}

export const getArticle = async (req, res) => {

    try {
        console.log("ok");
        const article = await articleModel.findById(req.params.id )
        res.status(200).json(article)

    } catch (err) {
        res.status(400).json({ message: "Article introuvable" })
    }
}

export const updateArticle = async (req, res) => {
    try {
      const form = formidable({ multiples: true })
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: "Un problème est survenu lors du téléchargement de fichiers." })
        }
        
        const article = await articleModel.findById(req.params.id)
        
        if (!article) {
          return res.status(404).json({error: "Cet article n'existe pas."})
        }
        
        // Supprimer les images sélectionnées
        const deletedImages = fields.deleteImages || []
        for (const image of deletedImages) {
          fs.unlink(`public/${image}`, (err) => {
            if (err && err.code !== "ENOENT") {
              return res.status(500).json({error: "La suppression d'image(s) a échoué."})
            }
          })
        }
  
        // Ajouter les nouvelles images et mettre à jour la base de données
        const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/news')
        const updatedImages = article.images.filter((i) => !deletedImages.includes(i)).concat(images)
        
        article.title = fields.title || article.title
        article.content = fields.content || article.content
        article.images = updatedImages
        article.save()
          .then((article) => res.status(201).json({message: "Article modifié avec succès!", article}))
          .catch((err) => res.status(400).json({error: "L'article n'a pas pu être modifié."}))
      })
    } catch (err) {
      return res.status(400).json({error: "L'article n'a pas pu être modifié."})
    }
  }
  

export const deleteArticle = (req, res) => {

    console.log(req.params.id);
    articleModel.findByIdAndDelete(req.params.id)
        .then(deletedArticle => {

            if (!deletedArticle) {
                return res.status(500).json({ error: "Article non trouvé." })
            }

            console.log(deletedArticle.images);
            deletedArticle.images.forEach((image) => {
                try {
                    fs.unlinkSync(`public/${image}`);
                    console.log("Le fichier a été supprimé avec succès!");
                } catch (err) {
                    console.log(err);
                    if (err.code !== "ENOENT") {
                        return res.status(500).json({ error: "Une erreur est survenue lors de la suppression des fichiers. Veuillez réessayer." });
                    }
                }
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
        .then((article) => {
            console.log(article);
            fs.readdir('public/images/news/', (err, files) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Une erreur est survenue lors de la récupération de la liste des fichiers." });
                }
                if (files.length === 0) {
                    console.log("Aucun fichier trouvé.");
                    return res.status(500).json({ error: "Aucun fichier trouvé." });
                }
                files.forEach((image) => {
                    try {
                        console.log(image);
                        fs.unlinkSync(`public/images/news/${image}`);
                        console.log("Le fichier a été supprimé avec succès!");
                    } catch (err) {
                        console.log(err);
                        if (err.code !== "ENOENT") {
                            console.log("Une erreur est survenue lors de la suppression du fichier.");
                        }
                    }
                })
            })
            console.log("Tous les articles ont été supprimés!");
            return res.status(204).send()
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: "Une erreur est survenue lors de la suppression des articles." });
        })

}
