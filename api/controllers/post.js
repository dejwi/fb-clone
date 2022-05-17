const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.get_single = (req, res, next) => {
    Post.findById(req.params.id)
        .populate('User')
        .populate({path: 'comments.author'})
        .then(post => {
            if (!post) return res.status(404).json({msg: 'Not found'});
            res.json(post);
        }).catch(err => next(err));
};

exports.get_latest = (req, res, next) => {
  Post.find()
      .sort({date: 1})
      .limit(12)
      .populate('User')
      .then(posts => {
          res.json(posts);
      }).catch(err => next(err));
};

exports.post_new = [
    body('content', 'Post content is required').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) return res.status(409).json({error: err.array()});

        const post = new Post({
            author: req.user._id,
            content: req.body.content
        });
        post.save(err => err && next(err));
    }
];

exports.delete = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (!post) return res.status(404).json({msg: "Not found"});
        if (post.author !== req.user._id) return res.status(401).json({error: "You are not the author of this post"});

        Post.findByIdAndRemove(req.params.id)
            .then(doc => res.json(doc))
            .catch(err => next(err));
    }).catch(err => next(err));
};

exports.post_comment = [
    body('content', 'Comment content is required').trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) return res.status(409).json({error: err.array()});

        const contents = { content: req.body.content, author: req.user._id };
        Post.findByIdAndUpdate(req.params.id, {$push: { comments: contents }})
            .then( doc => res.json(doc))
            .catch(err => next(err));
    }
];
