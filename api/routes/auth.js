const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();
const checkAuth = require('../middleware/checkAuth');

const authUserController = require('../controllers/authUser');

const auth = passport.authenticate('jwt', { session: false });

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: '/auth/facebook'
    }), (req, res) => {
        const token = req.user.token;
        res.redirect(`${process.env.FRONTEND_URL}/auth/${token}`);
    }
);

router.get('/info', auth , authUserController.me);
router.put('/info', auth, authUserController.me_update);

router.post('/addFriend/:id', auth, authUserController.sendFriendReq);
router.post('/acceptFriend/:id', auth, authUserController.acceptFriendReq);
router.delete('/removeFriend/:id', auth, authUserController.removeFriend);

router.get('/friendsfeed', auth, authUserController.friendsfeed);
router.get('/fdetail', auth, authUserController.friendninviteDetail);
router.get('/discovernew', auth, authUserController.discoverNewFriends);

router.get('/logout', auth, authUserController.logout);

module.exports = router;
