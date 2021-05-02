const Sequelize = require('sequelize');

const sequelize = require('../utils/config');

const Products = sequelize.define('Products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT,
    },
    category: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = Products;