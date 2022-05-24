const router = require('express').Router();
const postController = require('../controllers/post');
const passport = require('passport')
const validateId = require('../middleware/validateId');

const auth = passport.authenticate('jwt', { session: false });

router.get('/', postController.get_latest);
router.post('/', auth, postController.post_new);

router.get('/:id', validateId, postController.get_single);
router.delete('/:id', validateId, auth, postController.delete);

router.post('/:id/like', auth, validateId, postController.addLike);
router.delete('/:id/like', auth, validateId, postController.removeLike);

router.post('/:id/comment', auth, validateId, postController.post_comment);

module.exports = router;
