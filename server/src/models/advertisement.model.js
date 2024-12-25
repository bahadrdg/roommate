const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 100 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    location: { 
        type: [String],
        required: true, 
        trim: true 
    },
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    },
    images: [ 
        { 
            type: String 
        } 
    ],
    roomDetails: {
        roomType: { 
            type: String, 
            enum: ['Single', 'Double', 'Shared'], 
            required: true 
        },
        size: { 
            type: Number, 
            required: true 
        },
        furnished: { 
            type: Boolean, 
            default: false 
        }
    },
    preferences: {
        gender: { 
            type: String, 
            enum: ['Male', 'Famale'], 
            default: 'Male' 
        },
        smoking: { 
            type: Boolean, 
            default: false 
        },
        petsAllowed: { 
            type: Boolean, 
            default: false 
        },
        minAge: { 
            type: Number 
        },
        maxAge: { 
            type: Number 
        }
    },
    availability: { 
        type: Boolean, 
        default: true 
    }
});

module.exports = mongoose.model('Advertisement', advertisementSchema);
