import mongoose from 'mongoose';

// MODELE A REVOIR : COMMENT MEP DATE / HEURE DE DEBUT ET DE FIN ??

const bookingModel = new mongoose.Schema({

    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    animalName: {
        type: String,
        required: true
    },
    animalSize: { 
        type: Number,
        requried: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, ref: "Service"
    }
    
},  {
        timestamps: true
    }
);

export default mongoose.model("Booking", bookingModel);