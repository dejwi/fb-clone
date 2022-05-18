const User = require("../models/user");
const {body} = require("express-validator");

exports.me =  (req, res, next) => {
    const facebook_id = req.user.facebook_id;
    User.findOne({ facebook_id })
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
    User.findByIdAndUpdate(req.params.id, { $addToSet: { friendReqReceived: req.user._id } })
        .then(result => {
            if (!result.matchedCount) return res.status(404).json({ msg: 'User not found'});

            User.findByIdAndUpdate(req.user._id, { $addToSet: { friendReqSend: req.params.id } } )
                .then( result => res.json({ msg: 'Send' }));
        }).catch(err => next(err));
};

exports.acceptFriendReq = (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $pull: { friendReqReceived: req.params.id } } )
        .then(result => {
            if (!result.modifiedCount) return res.status(404).json({ msg: 'Friend request doesnt exist'});

            Promise.all([
                User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: req.params.id } } ),
                User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.user._id }, $pull: { friendReqSend: req.user._id }} )
            ]).then(result => res.json({ msg: 'Accepted' }))
                .catch(err => next(err));
        }).catch(err => next(err));
};
