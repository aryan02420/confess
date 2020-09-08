const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    // email: String,
    googleId: String,
    // hashedId: String,
    name: String,
    rank: [String],
    color: String,
    created: Date,
    index: Number
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;