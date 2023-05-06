import mongoose from "mongoose";

const articleModel = new mongoose.Schema(
  {
    forWhichPage: {
      type: String,
      required: [
        true,
        'Le champ "Pour quelle page?" est nécessaire, veuillez choisir une option.',
      ],
    },
    title: {
      type: String,
      required: [true, 'Le champ "Titre" est nécessaire, veuillez le remplir.'],
    },
    content: {
      type: String,
      required: [
        true,
        'Le champ "Contenu" est nécessaire, veuillez le remplir.',
      ],
    },
    images: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Article", articleModel);
