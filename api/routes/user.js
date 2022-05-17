const userController = require('../controllers/user');
const router = require('express').Router();

router.get('/:id', userController.get_single);
router.get('/:id/posts', userController.get_posts);

module.exports = router;
