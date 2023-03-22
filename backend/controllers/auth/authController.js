import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import formidable from 'formidable';
import { copyFile } from '../../utils/utils.js';

export const register = (req, res) => {
    const form = formidable();
    form.parse(req, (error, fields, files) => {

        if(error) return res.status(400).json({error: "Une erreur est survenue."})
        
        let avatar;
        const { isAdmin, defaultAvatar } = req.body;
        
        if(files && files.file) {
            avatar = copyFile(files.file !== undefined ? files.file : "");
        } else {
            avatar = isAdmin ? 'static-images/admin.png' : defaultAvatar;
        } ;
        
        userModel.create({
            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            phone: fields.phone,
            password: fields.password,
            avatar,
            isAdmin
        })
            .then((user) => {
                const token = user.createJWT();
                console.log(`Nouvel utilisateur: ${user} et son TOKEN: ${token}`);
                res.status(201).json({ message: "Votre compte a bien été créé!", 
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        avatar: user.avatar,
                        isAdmin: user.isAdmin
                    }, 
                    token 
                });
            })
            .catch((error) => {

                if(error.code === 11000) {
                    return res.status(400).json({error: "Cet utilisateur existe déjà."});
                } 

                return res.status(400).json({ error: `Une erreur est survenue et le compte n'a pas pu être créé. Veuillez réessayer.` });
            });
        });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Une erreur est survenue' });
        };

        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            const token = user.createJWT();
            return res.status(200).json({ message: `Bienvenue ${user.firstName}`, user, token });
        } else {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect.' });
        };

    } catch (error) {
        return res.status(500).json({ error: 'Email ou mot de passe introuvable.' });
    };
};

export const verifyToken = async (req, res) => {

    // Récupérer un token
    const headers = req.headers.authorization;

    // Si undefined -> error
    if (!headers) {
        return res.status(400).json({ error: "Aucun token fourni." });
    };

    const token = headers.split(' ')[1];

    // Analyser le token
    jwt.verify(token, "key_secret", async (error, decoded) => {
        // Si token invalide: renvoie une erreur
        if (error) {
            console.log(error);
            return res.status(403).send({ error: "Token invalide." });
            
        };

        // Si token valide: renvoie les infos du user
        const user = await userModel.findOne({ _id: decoded.id });
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    });
};