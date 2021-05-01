const sequelize = require('../utils/config')
const Sequelize = require('sequelize')

const Order = sequelize.define('Orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order;