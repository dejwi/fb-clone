const User = require("../models/user");
const Post = require("../models/post");
const {body} = require("express-validator");

exports.me =  (req, res, next) => {
    User.findById(req.user._id)
        //.populate('User') TODO: FIX
        .then( user => res.json(user));
};

exports.me_update = [
    body('username').trim().escape(),
    (req, res, next) => {
        const username = req.body.username;
        if (username)
            User.findByIdAndUpdate(req.user._id, { username }).catch(err => next(err) );
    }
];

exports.sendFriendReq = (req, res, next) => {
    User.updateOne({_id: req.params.id}, { $addToSet: { friendReqReceived: req.user._id } })
        .then(result => {
            if (!result.matchedCount) return res.status(404).json({ msg: 'User not found'});

            User.findByIdAndUpdate(req.user._id, { $addToSet: { friendReqSend: req.params.id } } )
                .then( result => res.json({ msg: 'Send' }));
        }).catch(err => next(err));
};

exports.acceptFriendReq = (req, res, next) => {
    User.updateOne({_id: req.params.id}, { $pull: { friendReqSend: req.user._id } } )
        .then(result => {
            if (!result.modifiedCount) return res.status(404).json({ msg: 'Friend request doesnt exist'});

            Promise.all([
                User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: req.params.id }, $pull: { friendReqReceived: req.params.id } } ),
                User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.user._id }} )
            ]).then(result => res.json({ msg: 'Accepted' }))
                .catch(err => next(err));
        }).catch(err => next(err));
};

exports.logout = (req, res) => {
    req.logout();
    res.json({msg: 'Logged out'});
};

exports.friendsfeed = (req, res, next) => {
    Post.find( {author: {$in: [req.user.friends]}})
        .populate('author')
        .populate({path: 'comments.author'})
        .sort({date: -1})
        .then(result => {
            res.json(result);
        }).catch(err => next(err));
};

exports.friendninviteDetail = async (req, res ,next) => {
    User.findById(req.user._id, {friends: 1, friendReqReceived: 1})
        .populate('friends').populate('friendReqReceived')
        .then(result => {
            res.json({friends: result.friends, invites: result.friendReqReceived});
        }).catch(err => next(err));
};

exports.discoverNewFriends = (req, res, next) => {
    User.find({_id: {$nin: [req.user._id, req.user.friends, req.user.friendReqReceived, req.user.friendReqSend] }})
        .then(result => res.json(result))
        .catch(err => next(err));
};

exports.removeFriend = (req, res, next) => {
    User.updateOne({_id: req.params.id}, {$pull: {friends: req.user._id}})
        .then(doc => {
            if (!doc.modifiedCount) return res.status(409).json({msg: 'You are not his friend'});

            User.findByIdAndUpdate(req.user._id, {$pull: { friends: req.params.id}})
                .then(()=>res.json({msg: 'Done'}))
                .catch(err => next(err));
        }).catch(err => next(err));
};
