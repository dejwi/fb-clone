const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const postController = require('../controllers/post');
const passport = require('passport')

const auth = passport.authenticate('jwt', { session: false });

router.get('/', postController.get_latest);
router.post('/', auth, postController.post_new);

router.get('/:id', postController.get_single);
router.delete('/:id', auth, postController.delete);

router.post('/:id/like', auth, postController.addLike);
router.delete('/:id/like', auth, postController.removeLike);

router.post('/:id/comment', auth, postController.post_comment);

module.exports = router;
