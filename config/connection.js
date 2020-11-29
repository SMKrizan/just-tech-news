// import Sequelize constructor from library
const Sequelize = require('sequelize');
require('dotenv').config()


// create db connection (via import by base Sequelize class) and pass in MySQL username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

// exports connectivity
module.exports = sequelize;