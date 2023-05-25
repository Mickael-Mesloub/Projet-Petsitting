import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { verifyToken, verifyIfIsAdmin } from "./middlewares/authMiddleware.js";
import {
  registerRouter,
  loginRouter,
  verifyTokenRouter,
} from "./routers/auth/authRouter.js";
import serviceRouter from "./routers/admin/serviceRouter.js";
import articleRouter from "./routers/admin/articleRouter.js";
import userRouter from "./routers/admin/userRouter.js";
import publicRouter from "./routers/public/publicRouter.js";
import profileRouter from "./routers/profile/profileRouter.js";
import animalRouter from "./routers/admin/animalRouter.js";
import bookingRouter from "./routers/admin/bookingRouter.js";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/verify-token", verifyTokenRouter);
app.use("/admin", [verifyToken, verifyIfIsAdmin], articleRouter);
app.use("/admin", [verifyToken, verifyIfIsAdmin], serviceRouter);
app.use("/admin", [verifyToken, verifyIfIsAdmin], userRouter);
app.use("/admin", [verifyToken, verifyIfIsAdmin], animalRouter);
app.use("/admin", [verifyToken, verifyIfIsAdmin], bookingRouter);
app.use("/", publicRouter);
app.use("/profile", [verifyToken], profileRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
