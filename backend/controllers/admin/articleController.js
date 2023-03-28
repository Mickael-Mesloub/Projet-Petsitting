import articleModel from '../../models/articleModel.js';
import formidable from 'formidable';
import fs from 'fs';
import { copyFiles } from '../../utils/utils.js'

export const createArticle = async (req, res) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (error, fields, files) => {

            if (error) {
                return res.status(500).json({ error: "Un problème est survenu lors du téléchargement de fichiers." });
            }

            const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/news');

            articleModel.create({
                title: fields.title,
                content: fields.content,
                images
            })
                .then((article) => {
                    res.status(201).json({ message: "Nouvel article créé avec succès!", article });
                })
                .catch((error) => res.status(500).json({ error: `Une erreur est survenue et l'article n'a pas pu être créé : ${error.message}. Veuillez réessayer.` }));
        })
    } catch (error) {
        res.status(500).json({ error: `Une erreur est survenue et l'article n'a pas pu être créé : ${error.message}. Veuillez réessayer.` })
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: `Articles introuvables : ${error.message}. Veuillez réessayer.` })
    }
};

export const getArticle = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.articleId );
        res.status(200).json(article);

    } catch (error) {
        res.status(400).json({ error: `Article introuvable : ${error.message}. Veuillez réessayer.` })
    }
};

export const updateArticle = async (req, res) => {
    try {
      const form = formidable({ multiples: true })
      form.parse(req, async (error, fields, files) => {

        if (error) {
          return res.status(500).json({ error: `Une erreur est survenue : ${error.message}. Veuillez réessayer.` });
        }
        
        const article = await articleModel.findById(req.params.articleId);
        
        if (!article) {
          return res.status(404).json({error: "Article inexistant."});
        }
        
        // Supprimer les images sélectionnées
        const deletedImages = fields.deleteImages || []

        for (const image of deletedImages) {
          fs.unlink(`public/${image}`, (error) => {

            if (error && error.code !== "ENOENT") {
              return res.status(500).json({error: "La suppression d'image(s) a échoué."});
            }

          })
        }
  
        // Ajouter les nouvelles images et mettre à jour la base de données
        const images = await copyFiles(files.file !== undefined ? files.file : [], 'images/news');
        const updatedImages = article.images.filter((i) => !deletedImages.includes(i)).concat(images);
        
        article.title = fields.title || article.title
        article.content = fields.content || article.content
        article.images = updatedImages
        article.save()
          .then((article) => res.status(201).json({message: "Article modifié avec succès!", article}))
          .catch((error) => res.status(400).json({error: `Une erreur est survenue et l'article n'a pas pu être modifié : ${error.message}. Veuillez réessayer.`}));
      })
    } catch (error) {
      return res.status(400).json({error: `Une erreur est survenue et l'article n'a pas pu être modifié : ${error.message}. Veuillez réessayer.`});
    }
};
  
export const deleteArticle = (req, res) => {
    articleModel.findByIdAndDelete(req.params.articleId)
        .then(deletedArticle => {

            if (!deletedArticle) {
                return res.status(500).json({ error: "Article introuvable." });
            }

            deletedArticle.images.forEach((image) => {
                try {
                    fs.unlinkSync(`public/${image}`);
                    console.log("Le fichier a été supprimé avec succès!");
                } catch (error) {
                    console.log(error);
                    if (error.code !== "ENOENT") {
                        return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.` });
                    }
                }
            })
            return res.status(204).send();
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: `Une erreur est survenue et l'article n'a pas pu être supprimé : ${error.message}. Veuillez réessayer.` });
        })
};

export const deleteAllArticles = (req, res) => {
    articleModel.deleteMany()
        .then((article) => {
            fs.readdir('public/images/news/', (error, files) => {

                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être récupéré(s) : ${error.message}. Veuillez réessayer.` });
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
                    } catch (error) {
                        console.log(error);

                        if (error.code !== "ENOENT") {
                            console.log(`Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`);
                            return res.status(500).json({error: `Une erreur est survenue et le(s) fichier(s) n'a / n'ont pas pu être supprimé(s) : ${error.message}. Veuillez réessayer.`})
                        }

                    }
                })
            })
            console.log("Tous les articles ont été supprimés!");
            return res.status(204).send()
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: `Une erreur est survenue et les articles n'ont pas pu être supprimés : ${error.message}. Veuillez réessayer.` });
        })

};
