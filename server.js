const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turns on routes
app.use(routes);

// turns on connection to db and server; 'sync' indicates that Sequelize is taking the models and connecting them to associated database tables and if a database is not found it will create one. Also - "force: false" will prevent all tables from automatically beng dropped and re-created on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});