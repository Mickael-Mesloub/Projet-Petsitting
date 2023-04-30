import mongoose from "mongoose";

const serviceModel = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [
        true,
        'Le champ "Catégorie" est requis pour la création du service, veuillez choisir une option.',
      ],
    },
    name: {
      type: String,
      required: [
        true,
        'Le champ "Nom de la prestation" est requis pour la création de service, veuillez le remplir.',
      ],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [
        true,
        'Le champ "Prix" est requis pour la création de service, veuillez le remplir.',
      ],
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceModel);
