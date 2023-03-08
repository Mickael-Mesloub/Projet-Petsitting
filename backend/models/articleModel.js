import mongoose from 'mongoose';

const articleModel = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: { 
        type: Array,
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

export default mongoose.model("Article", articleModel);