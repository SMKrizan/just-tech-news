// import Sequelize constructor from library
// const Sequelize = require('sequelize');
// require('dotenv').config()

// let sequelize;


// if (process.env.JAWSDB_URL) {
//     // create db connection via Heroku's connection variable
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//     // create db connection (via import by base Sequelize class) and pass in MySQL username and password
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 3306
//     });
// }

// // exports connectivity
// module.exports = sequelize;

const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;