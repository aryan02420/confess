const router = require('express').Router();
const Profile = require('../models/profiles');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const {allow, deny} = require('../services/privileges');
const newConfession =require('../services/discordjs');

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
const { isValidObjectId } = require('mongoose');
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const ung = require('@aryan02420/usernamegen');

const getPosts = (req, res) => {
    let { skip = 0, limit = 6 } = req.query;
    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 6;
    skip = skip < 0 ? 0 : skip;
    limit = Math.min(12, Math.max(1, limit));
    Promise.all([
        Post.find({}).sort({time: -1}).skip(skip).limit(limit).select('code -_id').lean(),
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
    let { c = 'none' } = req.query;
    c = c.toString().trim();    
    if (/^(?:[a-zA-Z0-9]|\_|\-){7}$/.test(c)) {
        Promise.all([
            Post.findOne({code: c}).populate('author', 'name rank color').select('author alias time code votes -_id').lean(),
            Comment.find({post_code: c}).sort({date: 1}).populate('author', 'name rank color').select('author alias body date').lean()
        ]).then(([post, comments]) => {
            post.time = timeAgo.format(parseInt(post.time), 'twitter');
            comments.forEach(comment => {
                if (comment.author._id.toString()===post.author._id.toString()) {
                    comment.author.rank.push('op');
                }
                if (comment.author._id.toString()===req.user._id.toString()) {
                    comment.author.rank.push('you');
                }
                comment.date = timeAgo.format(parseInt(comment.date), 'twitter');
                comment.author.name = comment.author.name || comment.alias;
                delete comment._id;
                delete comment.author._id;
                delete comment.alias;
            });
            post.author.name = post.author.name || post.alias;
            delete post.author._id;
            delete post.alias;
            if (post.votes.upvotes.includes(req.user._id.toString())) {
                post.voted = 'UP';
            } else if (post.votes.downvotes.includes(req.user._id.toString())) {
                post.voted = 'DOWN';
            } else {
                post.voted = '';
            }
            post.votes = post.votes.upvotes.length - post.votes.downvotes.length;
            res.status(200);
            res.json({post, comments});
        }).catch((err) => {
            console.log(err);
            res.status(422);
            res.json({message: 'Post Not Found1'});
        });
    } else {
        res.status(422);
        res.json({message: 'Post Not Found2'});
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

    const table = {"00":"0","01":"1","02":"2","03":"3","04":"4","05":"5","06":"6","07":"7","10":"8","11":"9","12":"a","13":"b","14":"c","15":"d","16":"e","17":"f","20":"g","21":"h","22":"i","23":"j","24":"k","25":"l","26":"m","27":"n","30":"o","31":"p","32":"q","33":"r","34":"s","35":"t","36":"u","37":"v","40":"w","41":"x","42":"y","43":"z","44":"A","45":"B","46":"C","47":"D","50":"E","51":"F","52":"G","53":"H","54":"I","55":"J","56":"K","57":"L","60":"M","61":"N","62":"O","63":"P","64":"Q","65":"R","66":"S","67":"T","70":"U","71":"V","72":"W","73":"X","74":"Y","75":"Z","76":"_","77":"-"};
    const dto64 = (dec) => {
        return dec.toString(8).padStart(14, "0").replace(/([0-7]{2})/g, ($1) => {
            return table[$1];
        });
    };

    if (isValidData(req.body)) {
        Promise.all([
            Post.countDocuments({})
        ]).then(([count]) => {
            let code = dto64(parseInt(req.body.time)-1594000000000);
            const alias = ung.generateUsername(`${code}${req.user._id}`);
            const maintext = req.body.maintext.toString().replace(/((?:^.{37}))(.+)/gm, '$1\r\n$2').replace(/^\s+/gm,'').replace(/(^(?:[^\r\n]*[\r\n]){17}[^\r\n]*)[\r\n].*/gm, '$1').replace(/\s+/gm,' ').trim();
            const sign = req.body.sign.toString().replace(/^\s+|\s{2,}$|\s*\n.*/gm,'').replace(/(.{0,24}).*/gm, '$1').trim()
            new Post({
                author: req.user._id,
                alias: alias,
                image: req.body.image.toString().trim(),
                thumbnail: req.body.thumb.toString().trim(),
                maintext: maintext,
                signature: sign,
                time: req.body.time.toString().trim(),
                code: code.toString(),
                index: parseInt(count)
            }).save((err) => {
                if (err) {
                    res.status(422);
                    res.json({message: 'Invalid Inputs'});
                } else {
                    newConfession(req.user.name || alias, req.user.color || ((req.user.rank.includes('admin') ? '#cc3333' : (req.user.rank.includes('moderator') ? '#00aa00' : '#1155dd'))) || '#1155dd', req.headers.origin, code, maintext.substring(0, 25)+'...', sign);
                }
            });
        });
        res.status(200);
        res.json({message:'all ok'});
    } else {
        res.status(422);
        res.json({message: 'Invalid Inputs'});
    }

}

router.post('/posts/new', allow(['user']), addPost);

const isValidComment = (comment, reqheader) => {
    return comment.text && comment.text.toString().trim() !== '' && comment.text.toString().trim().length <= 200 &&
           comment.code && comment.code.toString().trim() && /^(?:[a-zA-Z0-9]|\_|\-){7}$/.test(comment.code.toString().trim()) &&
           comment.code.toString().trim() === reqheader.match( /\/posts\/((?:[a-zA-Z0-9]|\_|\-){7})/ )[1];
}

const addComment = (req, res) => {
    
    if (isValidComment(req.body, req.headers.referer.toString().trim())) {
        let code = req.body.code;
        const alias = ung.generateUsername(`${code}${req.user._id}`);
        new Comment({
            author: req.user._id,
            alias: alias,
            body:req.body.text.toString().trim(),
            date: Date.now(),
            post_code: code.toString().trim(),
        }).save();
        res.status(200);
        res.json({message:'all ok'});
    } else {
        res.status(422);
        res.json({message: 'Invalid Inputs'});
    }

}

router.post('/comment', allow(['user']), addComment);

const isValidVote = (data, reqheader) => {
    return data.vote && (data.vote.toString().trim() === 'UP' || 'DOWN' || 'UNVOTE') &&
           data.code && data.code.toString().trim() && /^(?:[a-zA-Z0-9]|\_|\-){7}$/.test(data.code.toString().trim()) &&
           data.code.toString().trim() === reqheader.match( /\/posts\/((?:[a-zA-Z0-9]|\_|\-){7})/ )[1];
}

const addVote = (req, res) => {
    
    if (isValidVote(req.body, req.headers.referer.toString().trim())) {

        let vote = req.body.vote.toString().trim();
        let code = req.body.code;
        const uid = req.user._id.toString();
        Promise.all([Post.findOneAndUpdate({code: code}, {$pull: {'votes.downvotes': uid}} , (error, success) => {
            if (error) {
                res.status(422);
                res.json({message: 'Invalid-Inputs'});
            }
        }),Post.findOneAndUpdate({code: code}, {$pull: {'votes.upvotes': uid}} , (error, success) => {
            if (error) {
                res.status(422);
                res.json({message: 'Invalid-Inputs'});
            }
        })]).then(() => {
            if (vote === 'UP') {
                Post.findOneAndUpdate({code: code}, {$push: {'votes.upvotes': uid}} , (error, success) => {
                    if (error) {
                        res.status(422);
                        res.json({message: 'Invalid-Inputs'});
                    } else {
                        res.status(200);
                        res.json({message:'ok'});
                    }
                });
            } else if (vote === 'DOWN') {
                Post.findOneAndUpdate({code: code}, {$push: {'votes.downvotes': uid}} , (error, success) => {
                    if (error) {
                        res.status(422);
                        res.json({message: 'Invalid-Inputs'});
                    } else {
                        res.status(200);
                        res.json({message:'ok'});
                    }
                });
            } else {
                res.status(200);
                res.json({message:'ok'});
            }
        }).catch((err) => {
            res.status(422);
            res.json(err);
        });

    } else {
        res.status(422);
        res.json({message: 'Invalid Inputs'});
    }

}

router.post('/vote', allow(['user']), addVote);


module.exports = router;