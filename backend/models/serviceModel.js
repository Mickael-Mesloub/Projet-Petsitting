import mongoose from 'mongoose';

const serviceModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    visible: {
        type: Boolean,
        default: true,
        required: true
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

export default mongoose.model("Service", serviceModel);