const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const postController = require('../controllers/post');

router.get('/', postController.get_latest);
router.post('/', checkAuth, postController.post_new);

router.get('/:id', postController.get_single);
router.delete('/:id', checkAuth, postController.delete);

router.post('/:id/comment', checkAuth, postController.post_comment);

module.exports = router;
