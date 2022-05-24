const userController = require('../controllers/user');
const router = require('express').Router();
const validateId = require('../middleware/validateId');

router.get('/:id', validateId, userController.get_single);
router.get('/:id/posts', validateId, userController.get_posts);

module.exports = router;
