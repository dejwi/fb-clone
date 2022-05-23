const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');

exports.get_single = (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(user => {
        if (!user) return res.status(404).json( {msg: 'Not Found'} );
        res.json(user);
    }).catch(err => next(err));
};

exports.get_posts = (req, res, next) => {
    Post.find({ author: req.params.id } )
        .sort({date: -1})
        .populate('author')
        .populate({path: 'comments.author'})
        .then(posts => {
            res.json(posts);
        });
};
