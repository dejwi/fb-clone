const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const User = require('../models/user');

passport.use(new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'picture.type(large)']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne( { facebook_id: profile.id} ).then( user => {
            if (user) return done(null, user);

            const newUser = new User({
                username: profile.displayName,
                facebook_id: profile.id,
                picUrl: profile.photos[0].value
            });
            newUser.save( err => done(err, newUser) );
        }).catch(err => done(err));
    }
));

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((obj, done) => {
   User.findOne({ _id: obj._id }).then(result => {
     if (!result) return done(null, false);
     done(null, result);
   }).catch(err => done(err));
});
