import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { registerRouter, loginRouter, verifyTokenRouter } from './routers/publicRouters/authRouter.js'
import serviceRouter from './routers/adminRouters/serviceRouter.js';
import articleRouter from './routers/adminRouters/articleRouter.js';
import userRouter from './routers/adminRouters/userRouter.js';


const app = express();
const PORT = 9900;

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://mickaelmesloub:123@projetcluster.h7ing0k.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de donénes établie");
});

app.use('/register' , registerRouter);
app.use('/login' , loginRouter);
app.use('/verify-token' , verifyTokenRouter);
app.use('/admin' , articleRouter);
app.use('/admin' , serviceRouter);
app.use('/admin' , userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})