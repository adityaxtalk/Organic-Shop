const Products = require('../models/product.model')

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can't be empty"
        })
        return;
    }
    const title = req.body.title,
        price = req.body.price,
        category = req.body.category,
        imageUrl = req.body.imageUrl

    Products.create({ title: title, price: price, category: category, imageUrl: imageUrl })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating the Products'
            })
        })
}

exports.findAll = (req, res) => {
    Products.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving products"
            })
        })
}
exports.find = (req, res) => {
    Products.findByPk(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving products"
            })
        })
}
exports.update = (req, res) => {
    const id = req.params.id;
    Products.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully"
                })
            } else {
                res.send({
                    message: "Product was not updated"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product"
            })
        })
}
exports.delete = (req, res) => {
    const id = req.params.id;
    Products.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully"
                })
            } else {
                res.send({
                    message: "Product was not deleted"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Product"
            })
        })
}