const category = require('../models/category.model')


exports.getAll = (req, res) => {
    category.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving categories"
            })
        })
}