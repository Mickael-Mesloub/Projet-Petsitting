import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{8,}$/;

const userModel = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'Le champ "Prénom" est requis pour la création de compte, veuillez le remplir.']
    },
    lastName: {
        type: String,
        required: [true, 'Le champ "Nom" est requis pour la création de compte, veuillez le remplir.']
    },
    email: { 
        type: String,
        required: [true, 'Le champ "Email" est requis pour la création de compte, veuillez le remplir.'],
        unique: true,
        match: [emailRegex, "L'adresse e-mail doit être valide."]
    },
    phone: {
        type: String,
        match: [phoneRegex, "Le numéro de téléphone doit être valide."]
    },
    password: {
        type: String,
        required: [true, 'Le champ "Mot de passe" est requis pour la création de compte, veuillez le remplir.']
    },
    isAdmin: {
        type: Boolean,
        default: function() {
            return this.email === "admin@admin.com" || this.email === "fromont.ludivine@orange.fr" 
        }
    },
    avatar: {
        type: String,
        default: function() {
            if(this.isAdmin) {
                return 'static-images/admin.png'
            } else {
                return 'static-images/user.png'
            }
        }
    },
    defaultAvatar: {
        type: String,
        default: 'static-images/user.png'
    },
},  {
     timestamps: true
    }
);

// Méthode de cryptage de mot de passe: s'exécute avant la sauvegarde d'un user

userModel.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Méthode de comparaison de mdp: vérifie si le mdp rentré par user correspond au mdp stocké en DB

userModel.methods.comparePassword = function(candidatePassword,err) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Méthode de création de JWT qui récupère et stocke l'email et l'id du user ainsi qu'une clé secrète et une "date d'expiration" du jeton

userModel.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, 'key_secret', {expiresIn: '364d'})
}

export default mongoose.model("User", userModel);