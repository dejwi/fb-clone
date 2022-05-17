const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();
const User = require('../models/user');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook',
        successRedirect: process.env.FRONTEND_URL
    })
);

router.get('/me', (req, res, next) => {
   if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Not Authenticated'});
   const facebook_id = req.user.facebook_id;
   User.findOne({ facebook_id })
       //.populate('User') TODO: FIX
       .then( user => res.json(user));
});

module.exports = router;
