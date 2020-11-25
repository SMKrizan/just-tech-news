const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on routes
app.use(routes);

// turns on connection to db and server; 'sync' indicates that Sequelize is taking the models and connecting them to associated database tables and if a database is not found it will create one. Also - "force: true" will recreate the tables if there are any association changes, but which also drops all seed data that has been entered (whereas "force: false" would prevent all tables from automatically beng dropped and re-created on startup - similar to SQL's "DROP TABLE IF EXISTS")
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});