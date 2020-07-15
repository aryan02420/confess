const router = require('express').Router();
const Profile = require('../models/profiles');
const Post = require('../models/posts');
const {allow, deny} = require('../services/privileges');

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
const { isValidObjectId } = require('mongoose');
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const getPosts = (req, res) => {
    let { skip = 0, limit = 6 } = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 6;
    skip = skip < 0 ? 0 : skip;
    limit = Math.min(12, Math.max(1, limit));
    Promise.all([
        Post.find({}).sort({time: -1}).skip(skip).limit(limit).select('thumbnail'),
        Post.countDocuments({})
    ]).then(([posts, total]) => {
        res.status(200);
        res.json({
            posts,
            info: {
                total,
                skip,
                limit,
                has_more: total - (skip + limit) > 0,
            }
        });
    });
}

router.get('/posts', allow(['guest','user']), getPosts);

const getPost = (req, res) => {
    let { post_id = 'none' } = req.query;
    post_id = post_id.toString().trim();
    if (/^[a-f0-9]{24}$/.test(post_id)) {
        Post.findById(post_id).populate('author', 'name rank color').populate('comments.author', 'name rank color').select('author time image comments').then((post) => {
            res.status(200);
            res.json(post);
        }).catch((err) => {
            res.status(422);
            res.json({message: err});
        });
    } else {
        res.status(422);
        res.json({message: 'Post Not Found'});
    }
}

router.get('/post', allow(['guest','user']), getPost);

const isValidData = (data) => {    
    const delay = ( parseInt(Number(Date.now())) - parseInt(Number(data.time.toString().trim())) );
    const mt = data.maintext && data.maintext.toString().trim() !== '' && data.maintext.toString().trim().length <= 683;
    const si = data.sign && data.sign.toString().trim() !== '' && data.sign.toString().trim().length <= 24;
    const ti = data.time && data.time.toString().trim() !== '' && delay >= 0 && delay <= 5000;
    const im = data.image && data.image.toString().trim() !== '' && data.image.toString().trim().startsWith("data:image/jpeg;base64,");
    const th = data.thumb && data.thumb.toString().trim() !== '' && data.thumb.toString().trim().startsWith("data:image/jpeg;base64,");
    return mt && si && ti && im && th;
}

const addPost = (req, res) => {

    if (isValidData(req.body)) {
        new Post({
            author: req.user.id,
            image: req.body.image.toString().trim(),
            thumbnail: req.body.thumb.toString().trim(),
            maintext: req.body.maintext.toString().replace(/((?:^.{37}))(.+)/gm, '$1\r\n$2').replace(/^\s+/gm,'').replace(/(^(?:[^\r\n]*[\r\n]){17}[^\r\n]*)[\r\n].*/gm, '$1').replace(/\s+/gm,' ').trim(),
            signature: req.body.sign.toString().replace(/^\s+|\s{2,}$|\s*\n.*/gm,'').replace(/(.{0,24}).*/gm, '$1').trim(),
            time: req.body.time.toString().trim()
        }).save();
        res.status(200);
        res.json({message:'all ok'});
    } else {
        res.status(422);
        res.json({message: 'Invalid Inputs'});
    }
}

router.post('/posts/new', allow(['user']), addPost);

const isValidComment = (comment) => {
    return comment && comment.toString().trim() !== '' && comment.toString().trim().length <= 200;
}

const addComment = (req, res) => {

    if (isValidComment(req.body.comment)) {
        let comment = {author:req.user._id, body:req.body.comment.toString().trim(), date: Date.now()};
        let post_id = req.headers.referer.toString().trim().match( /([0-9a-f]{24})/ )[0];
        Post.findOneAndUpdate({_id: post_id}, {$push: {comments:comment}}, (error, success) => {
            if (error) {
                res.status(422);
                res.json({message: 'Invalid Inputs'});
            } else {
                res.status(200);
                res.json({message:'ok'})
            }
        });
    } else {
        res.status(422);
        res.json({message: 'Invalid Inputs'});
    }

}

router.post('/comment', allow(['user']), addComment);

module.exports = router;