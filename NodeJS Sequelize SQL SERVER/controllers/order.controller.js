const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const Shipping = require('../models/shipping.model')
const Order = require('../models/order.model')
exports.getOrder = async(req, res) => {
    try {
        const order = await Order.findAll({ 'include': ['Products', 'Shippings'] })
        res.send(order);
    } catch (error) {
        res.status(400).send(error)
    }
}
exports.getOrderById = async(req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.userId } })
        orders = await user.getOrders({ include: ['Products', 'Shippings'] })
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}
exports.addOrder = async(req, res) => {
    try {
        shipping = req.body.shipping
        cartId = req.body.cartId

        const user = await User.findOne({ where: { id: req.userId } })
        const order = await user.createOrder()
        const cart = await Cart.findOne({ where: { id: cartId } })
        const products = await cart.getProducts();
        let result = await order.addProducts(
            products.map(product => {
                product.OrderItem = { quantity: product.CartItem.quantity }
                return product;
            }))


        if (result) {
            await Shipping.create({ name: shipping.name, Address1: shipping.addressLine1, Address2: shipping.addressLine2, City: shipping.city, OrderId: order.get('id') })
            await cart.setProducts(null)
            res.send({ message: "Success" })
        }


    } catch (error) {
        res.status(500).json('Error occurred while handling the request.')
    }
}