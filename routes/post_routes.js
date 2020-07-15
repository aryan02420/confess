const router = require('express').Router();
const Post = require('../models/posts');
const Profile = require('../models/profiles');
const {allow, deny} = require('../services/privileges');

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


router.get('/', allow(['guest','user']), (req, res) => {
    res.render('gallery', { user: req.user });
});

router.get('/new', allow(['user']), (req, res) => {
    res.render('editor');
});

router.get('/:post_id', allow(['guest', 'user']), (req, res) => {
    const post_id = req.params.post_id.toString().trim();
    if (/^[a-f0-9]{24}$/.test(post_id)) {
        Post.findById(post_id).populate('author', 'name rank color').populate('comments.author', 'name rank color').select('author.name author.rank time image comments').then((post) => {
            res.status(200);
            res.render('post', { user: req.user, data:post, timeformatter:timeAgo });
        }).catch((err) => {
            res.status(422);
            res.json({message: err});
        });
    } else {
        res.status(422);
        res.json({message: 'Post Not Found'});
    }
});

module.exports = router;