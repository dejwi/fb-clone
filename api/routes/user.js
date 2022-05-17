const userController = require('../controllers/user');
const router = require('express').Router();

router.get('/:id', userController.get_single);

module.exports = router;
