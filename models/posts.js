const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profiles');

const postSchema = new Schema({
    author: {
        type :Schema.Types.ObjectId,
        ref: Profile
    },
    alias: String,
    image: String,
    thumbnail: String,
    maintext: String,
    signature: String,
    time: String,
    code: String,
    index: Number,
    votes: {
        upvotes: [String],
        downvotes: [String],
    },
    comments: [{
        author: {
            type :Schema.Types.ObjectId,
            ref: Profile
        },
        alias: String,
        body: String,
        date: String 
    }]
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;