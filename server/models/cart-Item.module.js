const Sequelize = require('sequelize');

const sequelize = require('../utils/config');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;