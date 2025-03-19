import mongoose from 'mongoose';

// Define the Help Request schema
const helpRequestSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        default: '' // Default empty string if no location is provided
    },
    isResolved: { 
        type: Boolean, 
        default: false // Default is false (help request not resolved)
    },
    volunteers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
}, { timestamps: true });

// Create the Help Request model
const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);

export default HelpRequest;
