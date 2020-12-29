const mongoose = require('mongoose');

// Model danh cho user
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    birthday: {
        type: Date,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('users', userSchema);
