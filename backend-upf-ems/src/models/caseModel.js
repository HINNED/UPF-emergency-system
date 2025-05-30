const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseNumber: {
        type: String,
        required: true,
        unique: true
    },
    callerName: {
        type: String,
        required: true
    },
    callerPhone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    emergencyType: {
        type: String,
        required: true,
        enum: ['robbery', 'accident', 'fire', 'medical', 'domestic', 'kidnap', 'other']
    },
    description: {
        type: String,
        required: true
    },
    location: {
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    referralStation: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'in-progress', 'resolved', 'closed']
    },
    assignedOfficer: {
        type: String,
        required: true
    }
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;