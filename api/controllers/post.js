const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const AWS = require('aws-sdk');
const fs = require('fs');
const multiparty = require('multiparty');
const {v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.get_single = (req, res, next) => {
    Post.findById(req.params.id)
        .populate('author')
        .populate({path: 'comments.author'})
        .then(post => {
            if (!post) return res.status(404).json({msg: 'Not found'});
            res.json(post);
        }).catch(err => next(err));
};

exports.get_latest = (req, res, next) => {
  Post.find({})
      .sort({date: -1})
      .limit(12)
      .populate('author')
        .populate({path: 'comments.author'})
      .then(posts => {
          res.json(posts);
      }).catch(err => next(err));
};

exports.post_new = async (req, res, next) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
        if (error) return res.status(500).json({ err: error });

        // Validate and sanitize content
        req.body.content = fields.content[0];
        await body('content', 'Post content is required').trim().isLength({min:1}).escape().run(req);
        const err = validationResult(req);
        if (!err.isEmpty()) return res.status(409).json({error: err.array()});

        try {
            let uploadedImagePath = null;
            if (files.file){
                const path = files.file[0].path;
                const blob = fs.readFileSync(path);

                const uploadedImage = await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: uuidv4(),
                    Body: blob,
                }).promise();
                uploadedImagePath = uploadedImage.Location;
            }
            let postData = {
                author: req.user._id,
                content: fields.content[0],
            };
            if (uploadedImagePath)
                postData = { ...postData, picUrl: uploadedImagePath };

            const post = new Post(postData);

            post.save(err => {
                if (err) return next(err);
                res.json(post);
            });
        } catch (err) {
            return res.status(500).json({ err });
        }
    });
};

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
