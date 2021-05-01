const router = require('express').Router();
const isAuth = require('../middleware/is-auth')
const orderController = require('../controllers/order.controller')

router.post('/', isAuth, orderController.addOrder);
router.get('/', isAuth, orderController.getOrder);
router.get('/id', isAuth, orderController.getOrderById);

module.exports = router;