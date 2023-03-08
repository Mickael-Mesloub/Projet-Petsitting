import articleModel from '../../models/articleModel.js';
import formidable from 'formidable';
import fs from 'fs';
import {generateRandomFilename} from '../../utils/utils.js'

// Fonctions asynchrones: accèdent à la DB donc meilleure gestion des erreurs et exceptions car la requête peut prendre du temps 

export const createArticle = async (req, res) => {

    try {
        const copyFiles = (path, files) => {

            const promises = files.map((file) => {

            })
        }

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            const copyFiles = files.file.forEach( async(file) => {
                const newFilename = generateRandomFilename(file.originalFilename);
                const oldpath = file.filepath;
                const newpath = `images/${newFilename}`;
                console.log(newpath);
                const copy = fs.copyFile(oldpath, `public/${newpath}` , (err) => {
                    if(err) {
                        return res.status(500).json({message: "La copie de fichier a échouée."})
                    }
                    // else {
                    //     return res.status(200).json({message: "Les fichiers ont été copiés avec succès!" , newpath})
                    // }
                console.log(copy);
                }) 
            })

        //     const images = [];
        //     const article = await articleModel.findOne({ _id: fields.id });
            

            

        //         articleModel.create({
        //             title: fields.title,
        //             content: fields.content,
        //             images: newpath
        //         })
        //             .then((article) => {
        //                 console.log(article);
        //                 res.status(200).json({ message: "Nouvel article créé avec succès!", article })
        //             })
        //             .catch((err) => res.status(500).json({ message: err }))
            
        })

    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création du produit." })
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
        res.status(400).json({ message: "Produit introuvable" })
    }
}

export const updateArticle = async (req, res) => {

    try {

        const article = await articleModel.findOne({ _id: req.params.id });
        console.log("là");
        console.log(article);

        if (!article) {
            console.log("pas ok");
        }

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

                const copyFiles = files.file.forEach( async(file) => {
                    const newFilename = generateRandomFilename(file.originalFilename);
                    const oldpath = file.filepath;
                    const newpath = `images/${newFilename}`;
                    console.log(newpath);
                    const copy = fs.copyFile(oldpath, `public/${newpath}` , (err) => {
                        if(err) {
                            return res.status(500).json({message: "La copie de fichier a échouée."})
                        }
                        // else {
                        //     return res.status(200).json({message: "Les fichiers ont été copiés avec succès!" , newpath})
                        // }
                    console.log(copy);
                    }) 
                })

            const updatedArticle = await articleModel.findByIdAndUpdate(req.params.id,
                {
                    title: fields.title || article.title,
                    content: fields.content || article.content,
                    images: imagePath,
                },
                { new: true }
            );

            res.status(200).json({
                message: `L'article ${updatedArticle.title} a été modifié avec succès!`,
                article: updatedArticle,
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la modification du produit." });
    }
        };

export const deleteArticle = (req, res) => {

    console.log(req.params.id);
    articleModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedArticle => {

            if(!deletedArticle) {
                return res.status(500).json({message: "Article non trouvé."})
            }
            console.log(deletedArticle.images);
            deletedArticle.images.forEach((image) => {
                fs.unlink(`public/${image}`)
            })
            console.log("deleted");
            console.log(deletedArticle);

            return res.status(204).send()
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({ message: "Le produit n'a pas pu être supprimé." });
        })
};