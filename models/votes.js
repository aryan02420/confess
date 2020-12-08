const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profiles');
const Post = require('./posts');

const voteSchema = new Schema({
    upvotes: [String],
    downvotes: [String],
    post_code: String,
});

const Vote = mongoose.model('vote', voteSchema);

module.exports = Vote;