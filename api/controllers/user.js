const User = require('../models/user');


exports.get_single = (req, res, next) => {
    User.findById(req.params.id).then(user => {
        res.json(user);
    }).catch(err => next(err));
};