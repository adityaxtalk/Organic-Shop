const router = require('express').Router();
const cartController = require('../controllers/cart.controller');

router.post('/', cartController.addToCart);

router.get('/:cartId', cartController.getCart);

router.put('/', cartController.removeFromCart);

router.delete('/delete/:cartId/:productId', cartController.remove);

module.exports = router;