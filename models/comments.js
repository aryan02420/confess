const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profiles');
const Post = require('./posts');

const commentSchema = new Schema({
    author: {
        type :Schema.Types.ObjectId,
        ref: Profile
    },
    alias: String,
    body: String,
    date: String,
    post_code: String,
    // repliedTo: {
    //     type :Schema.Types.ObjectId,
    //     ref: Comment
    // }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;