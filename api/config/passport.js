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
        User.find( { facebook_id: profile.id} ).then( user => {
            if (user) return done(null, user);

            const newUser = new User({
                facebook_id: profile.id,
                picUrl: profile.photos[0].value
            });
            newUser.save();
            done(null, newUser);
        }).catch(err => done(err));
        done(null, {...profile});
    }
));

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((obj, done) => {
   done(null, obj);
});
