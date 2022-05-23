const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

passport.use(new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `${process.env.ORG_URL}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'picture.type(large)']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne( { facebook_id: profile.id} ).then( user => {
            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                        expiresIn: '1d',
                    });
                return done(null, {...user, token});
            }

            const newUser = new User({
                username: profile.displayName,
                facebook_id: profile.id,
                picUrl: profile.photos[0].value
            });
            newUser.save( err => {
                newUser.token = jwt.sign({ _id: newUser._id  }, process.env.SECRET, {
                    expiresIn: '1d',
                });
                done(err, newUser);
            } );
        }).catch(err => done(err));
    }
));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${process.env.ORG_URL}/auth/google/callback`,
        scope: [ 'profile' ],
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne( { google_id: profile.id} ).then( user => {
            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
                        expiresIn: '3d',
                    });
                return done(null, {...user, token});
            }

            const newUser = new User({
                username: profile.displayName,
                google_id: profile.id,
                picUrl: profile.photos[0].value,
            });
            newUser.save( err => {
                newUser.token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
                    expiresIn: '3d',
                });
                done(err, newUser);
            } );
        }).catch(err => done(err));
    }
));

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },
        (token, done) => {
            try {
                User.findOne({_id: token._id})
                    .then(user => done(null, user))
                    .catch(err => done(err));
            } catch (error) {
                return done(error);
            }
        }
    )
);