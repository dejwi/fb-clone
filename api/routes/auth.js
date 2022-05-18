const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();
const checkAuth = require('../middleware/checkAuth');

const authUserController = require('../controllers/authUser');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook',
        successRedirect: process.env.FRONTEND_URL
    })
);

router.get('/info', checkAuth, authUserController.me);
router.put('/info', checkAuth, authUserController.me_update);

router.post('/addFriend/:id', checkAuth, authUserController.sendFriendReq);
router.post('/acceptFriend/:id', checkAuth, authUserController.acceptFriendReq);

module.exports = router;
