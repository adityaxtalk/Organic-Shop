const Sequelize = require('sequelize');

const sequelize = require('../utils/config');

const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING
    },

}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = Category;