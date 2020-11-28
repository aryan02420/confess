const router = require('express').Router();
const Post = require('../models/posts');

router.get('/', (req, res) => {
    res.set('Content-Type', 'image/png')
    res.send(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', 'base64'))
});

router.get('/thumb/:code', (req, res) => {
    const code = req.params.code.toString().trim();
    if (/^(?:[a-zA-Z0-9]|\_|\-){7}$/.test(code)) {
        Post.findOne({code: code}).select('thumbnail -_id').then((data) => {
            let file = Buffer.from(data.thumbnail.split(',')[1], 'base64')
            res.status(200);
            res.set('Content-Type', 'image/jpeg');
            res.set('Content-Length', file.length)
            res.send(file)
        }).catch(() => {
            res.status(404);
            res.json({message: 'Image Not Found'});
        })
    } else {
        res.status(404);
        res.json({message: 'Image Not Found'});
    }
});

router.get('/:code', (req, res) => {
    const code = req.params.code.toString().trim();
    if (/^(?:[a-zA-Z0-9]|\_|\-){7}$/.test(code)) {
        Post.findOne({code: code}).select('image -_id').then((data) => {
            let file = Buffer.from(data.image.split(',')[1], 'base64')
            res.status(200);
            res.set('Content-Type', 'image/jpeg');
            res.set('Content-Length', file.length)
            res.send(file)
        }).catch(() => {
            res.status(404);
            res.json({message: 'Image Not Found'});
        })
    } else {
        res.status(404);
        res.json({message: 'Image Not Found'});
    }
});

module.exports = router;