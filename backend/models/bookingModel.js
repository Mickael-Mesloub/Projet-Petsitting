import mongoose from "mongoose";

const bookingModel = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Le champ "Date" est requis, veuillez le remplir.'],
    },
    startTime: {
      type: String,
      required: [
        true,
        'Le champ "Heure de début" est requis, veuillez le remplir.',
      ],
    },
    endTime: {
      type: String,
      required: [
        true,
        'Le champ "Heure de fin" est requis, veuillez le remplir.',
      ],
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: [true, 'Le champ "Animal" est requis, veuillez le remplir.'],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, 'Le champ "Service" est requis, veuillez le remplir.'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingModel);
