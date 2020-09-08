const router = require('express').Router();
const Post = require('../models/posts');
const Profile = require('../models/profiles');
const {allow, deny} = require('../services/privileges');

router.get('/', allow(['guest','user']), (req, res) => {
    res.render('gallery', { user: req.user });
});

router.get('/new', allow(['user']), (req, res) => {
    res.render('editor');
});

router.get('/:code', allow(['guest', 'user']), (req, res) => {
    const code = req.params.code.toString().trim();
    if (/^[a-z0-9A-Z]{7}$/.test(code)) {
        res.status(200);
        res.render('post', { user: req.user });
    } else {
        res.status(422);
        res.json({message: 'Post Not Found'});
    }
});

module.exports = router;