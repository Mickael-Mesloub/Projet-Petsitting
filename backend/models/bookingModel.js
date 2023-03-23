import mongoose from 'mongoose';

// MODELE A REVOIR : COMMENT MEP DATE / HEURE DE DEBUT ET DE FIN ??

const bookingModel = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId, ref: "Animal",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, ref: "Service",
        required: true
    }
    
},  {
        timestamps: true
    }
);

export default mongoose.model("Booking", bookingModel);