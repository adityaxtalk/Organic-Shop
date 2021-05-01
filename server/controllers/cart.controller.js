const e = require('express');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.getCart = async(req, res) => {
    try {
        const cartId = req.params.cartId;
        let cart = await Cart.findOne({ where: { id: cartId } })
        if (!cart) {
            cart = await Cart.create();
        }
        const products = await cart.getProducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(error.status || 500).send({
            error: error.message || 'Internal Server Error'
        })
    }
}

exports.addToCart = async(req, res) => {
    try {
        const productId = req.body.id;
        const cartId = parseInt(req.body.cartId);
        let fetchedCart;
        let newQuantity = 1;
        let cart = await Cart.findOne({ where: { id: cartId } });

        if (!cart) {

            cart = await Cart.create();


        }
        fetchedCart = cart;
        const products = await cart.getProducts({ where: { id: productId } })
        let product;
        if (products.length > 0) {
            product = products[0]

        }
        if (product) {
            const oldQuantity = product.CartItem.quantity;
            newQuantity = oldQuantity + 1;
        } else {
            product = await Product.findByPk(productId);
        }

        const result = await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        if (result) {
            res.status(201).send({ message: "Item added successfully", cartId: cart.id });
        } else {
            res.status(500).send({ message: "Internal Server error" })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Error while creating cart.'
        })
    }
}

exports.removeFromCart = async(req, res) => {
    try {
        const productId = req.body.id;
        const cartId = req.body.cartId;
        let cart = await Cart.findOne({ where: { id: cartId } });

        const products = await cart.getProducts({ where: { id: productId } })
        let product = products[0];

        let result;
        let quantity = product.CartItem.quantity;
        console.log(quantity)
        if (quantity == 1) {

            result = await product.CartItem.destroy();

        } else {

            quantity -= 1;
            result = await cart.addProduct(product, { through: { quantity: quantity } })

        }

        if (result) {

            res.status(201).send({ cartId: cartId })
        } else {
            res.status(500).send({ message: "Internal Server error" })
        }

    } catch (error) {

        res.status(error.status || 500).send({
            message: error.message || 'Internal Server Error'
        })
    }
}
exports.remove = async(req, res) => {
    try {
        console.log("hello")
        const productId = req.params.productId;
        const cartId = req.params.cartId;
        let cart = await Cart.findOne({ where: { id: cartId } });
        const products = await cart.getProducts({ where: { id: productId } })
        let product = products[0];
        const result = await product.CartItem.destroy()
        if (result) {
            res.send("Success")
        } else {
            res.status(500).send("Internal Server error")
        }

    } catch (error) {
        res.status(error.status || 500).send(error.message || 'Internal Server Error')
    }
}