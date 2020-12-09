const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profiles');
const Post = require('./posts');

const voteSchema = new Schema({
    upvotes: {
        type: [String],
        required: true
      },
    downvotes: {
        type: [String],
        required: true
      },
    post_code: String,
    comment_code: String
});

const Vote = mongoose.model('vote', voteSchema);

module.exports = Vote;