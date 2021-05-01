const router = require('express').Router();

const userRouter = require('./user.routes')
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');
const cartRouter = require('./cart.route')
const orderRouter = require('./order.route')
router.use('/user', userRouter);

router.use('/products', productRouter);

router.use('/category', categoryRouter);

router.use('/cart', cartRouter);

router.use('/order', orderRouter);

module.exports = router;