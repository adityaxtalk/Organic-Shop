const Sequelize = require('sequelize');
const sequelize = new Sequelize('Ecommerce', 'database', 'htdx8584', {
    host: 'localhost',
    dialect: 'mssql'
})



module.exports = sequelize;