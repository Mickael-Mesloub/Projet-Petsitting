import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {

    const headers = req.headers.authorization;

    if (!headers) {
        return res.status(400).json({ error: "Aucun token fourni." });
    }

    const token = headers.split(' ')[1];

    jwt.verify(token, "key_secret", async (error, decoded) => {

        if (error) {
            console.log(error);
            return res.status(403).send({ error: "Token invalide." });
        }
        console.log( "REQ: " + req);
        req.userId = decoded.id;
        next();
    });
};

export const verifyIfIsAdmin = (req, res, next) => {
    userModel.findById(req.userId)
        .then((user) => {
            if(user.isAdmin) {
                next()
            } else {
                return res.status(403).json({error: "Vous n'êtes pas autorisé(e) à consulter cette page."});
            };
        })
        .catch((error) => {
            return res.status(500).json({error: `Une erreur s'est produite : ${error.message} `});
        });
};