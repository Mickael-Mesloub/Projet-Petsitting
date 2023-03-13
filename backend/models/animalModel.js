import mongoose from 'mongoose';

const animalModel = new mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    images: { 
        type: Array,
    },

},  {
        timestamps: true
    }
);

export default mongoose.model("Animal", animalModel);