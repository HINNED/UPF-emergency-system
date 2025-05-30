const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['officer', 'station', 'admin'],
        required: true
    },
    station: {
        type: String,
        required: function() {
            return this.role === 'officer' || this.role === 'station';
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;