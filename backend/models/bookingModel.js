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
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, ref: "Service"
    }
    
},  {
        createdAt: {
            type: String,
            default: new Date().toLocaleString('fr-FR')
        },
        updatedAt: {
            type: String,
            default: new Date().toLocaleString('fr-FR')
        }
    }
);

export default mongoose.model("Booking", bookingModel);