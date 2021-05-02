const Sequelize = require('sequelize');

const sequelize = require('../utils/config');

const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = Users;