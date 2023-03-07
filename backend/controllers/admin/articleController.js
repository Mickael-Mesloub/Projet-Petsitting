import articleModel from '../../models/articleModel.js';
import formidable from 'formidable';
import fs from 'fs';

// Fonctions asynchrones: accèdent à la DB donc meilleure gestion des erreurs et exceptions car la requête peut prendre du temps 

export const createArticle = async (req, res) => {

    try {
        const copyFiles = (path, files) => {

            const promises = files.map((file) => {

            })

            
        }
        
        const generateRandomFilename = (originalFilename) => {
            const fileExtension = originalFilename.split('.').pop();
            const randomString = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            const timestamp = Date.now();
            return `${timestamp}-${randomString}.${fileExtension}`;
        }

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {

            files.file.forEach( async(file) => {
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


export const getAllProducts = async (req, res) => {

    try {

        const products = await articleModel.find({})
        res.status(200).json(products)

    } catch (err) {
        res.status(400).json({ message: err })
    }
}

export const getProductDetails = async (req, res) => {

    try {

        const product = await articleModel.findOne({ _id: req.params.id })
        res.status(200).json(product)

    } catch (err) {
        res.status(400).json({ message: "Produit introuvable" })
    }
}

export const updateProduct = async (req, res) => {

    try {

        const product = await articleModel.findOne({ _id: req.params.id });
        console.log("là");
        console.log(product);

        if (!product) {
            console.log("pas ok");
        }

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ message: "Une erreur s'est produite" });
            }

            // If the user uploaded a new image file, update the image path
            let imagePath = product.images;
            if (files.file) {
                const oldpath = files.file.filepath;
                const newFilename = `${Date.now()}-${files.file.originalFilename}`;
                const newpath = "img/" + newFilename;
                await fs.promises.copyFile(
                    oldpath,
                    "./public/" + newpath
                );
                imagePath = newpath;
            }

            // Update the product with the new values
            const updatedProduct = await articleModel.findByIdAndUpdate(
                req.params.id,
                {
                    name: fields.name || product.name,
                    description: fields.description || product.description,
                    images: imagePath,
                    quantity: fields.quantity || product.quantity,
                    price: fields.price || product.price,
                },
                { new: true } // Return the updated document
            );

            res.status(200).json({
                message: `Le produit ${updatedProduct.name} a été modifié avec succès!`,
                product: updatedProduct,
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la modification du produit." });
    }
        };

export const deleteProduct = (req, res) => {

        try {
            console.log(req.params.id);
            articleModel.findOneAndDelete({ _id: req.params.id }, (deletedProduct, err) => {
                // if(!deletedProduct) {
                //     return res.status(500).json({message:"Produit introuvable."});
                // }
                console.log(deletedProduct);
                if (deletedProduct) {
                    deletedProduct.images.forEach((image) => {
                        fs.unlink(image)
                    })
                }
            })

            return res.status(204).json({ message: `Le produit a été supprimé avec succès!` })

        } catch (err) {
            res.status(500).json({ message: err })
        }
    }