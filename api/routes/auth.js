const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook',
        successRedirect: process.env.FRONTEND_URL
    })
);

module.exports = router;
