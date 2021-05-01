const router = require('express').Router();
const userController = require('../controllers/user.controller');
const userCtrl = require('../controllers/user.controller')

router.post('/register', userCtrl.register);
router.post('/login', userController.login);
module.exports = router;