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
        timestamps: true
    }
);

export default mongoose.model("Article", articleModel);