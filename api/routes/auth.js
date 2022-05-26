const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();
const validateId = require('../middleware/validateId');

const authUserController = require('../controllers/authUser');

const auth = passport.authenticate('jwt', { session: false });

router.get('/facebook', passport.authenticate('facebook', {session: false}));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: '/auth/facebook'
    }), (req, res) => {
        const token = req.user.token;
        res.redirect(`${process.env.FRONTEND_URL}/auth/${token}`);
    }
);

router.get('/google', passport.authenticate('google', {session: false, prompt: 'select_account'}));
router.get('/google/callback',
    passport.authenticate('google', {
        session: false,
        failureMessage: true,
        failureRedirect: '/auth/google',
    }), (req, res) => {
        const token = req.user.token;
        res.redirect(`${process.env.FRONTEND_URL}/auth/${token}`);
    }
);

router.get('/info', auth , authUserController.me);

router.put('/username', auth, authUserController.me_update_username);
router.put('/prof', auth, authUserController.me_update_prof);
router.put('/bg', auth, authUserController.me_update_bg);

router.post('/addFriend/:id', auth, validateId, authUserController.sendFriendReq);
router.post('/acceptFriend/:id', auth, validateId, authUserController.acceptFriendReq);
router.delete('/removeFriend/:id', auth, validateId, authUserController.removeFriend);

router.get('/friendsfeed', auth, authUserController.friendsfeed);
router.get('/fdetail', auth, authUserController.friendninviteDetail);
router.get('/discovernew', auth, authUserController.discoverNewFriends);

router.get('/chats', auth, authUserController.getChats);

router.get('/logout', auth, authUserController.logout);

module.exports = router;
