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