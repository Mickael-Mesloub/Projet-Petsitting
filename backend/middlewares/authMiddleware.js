import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {

    const headers = req.headers.authorization;

    if (!headers) {
        return res.status(400).json({ error: "Aucun token fourni." })
    }

    const token = headers.split(' ')[1]
    console.log(token);

    jwt.verify(token, "key_secret", async (err, decoded) => {

        if (err) {
            console.log(err);
            return res.status(403).send({ error: "Token invalide." });
        }

        req.userId = decoded.id;
        next();
    });
}