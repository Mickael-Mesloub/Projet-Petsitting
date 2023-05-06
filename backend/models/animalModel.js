import mongoose from "mongoose";

const animalModel = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, 'Le champ "Nom" est requis, veuillez le remplir.'],
    },
    description: {
      type: String,
      required: [
        true,
        'Le champ "Description" est requis, veuillez le remplir.',
      ],
    },
    size: {
      type: String,
      required: [true, 'Le champ "Taille" est requis, veuillez le remplir.'],
    },
    images: {
      type: Array,
      required: [true, 'Le champ "Images" est requis, veuillez le remplir.'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Animal", animalModel);
