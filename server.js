const path = require('path');

const express = require('express');
// template engine:
const exphbs = require('express-handlebars');

const app = express();
const routes = require('./controllers/');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
// url space-handling
app.use(express.urlencoded({ extended: false }));
// the following 'express.static' method is is a built-in Express.js middlewear function that takes all contents of a folder and delivers them as static assets, which is helpful for front-end specific files like images, stylesheets and js files.
app.use(express.static(path.join(__dirname, 'public')));

// turns on routes
app.use(routes);

// turns on connection to db and server; 'sync' indicates that Sequelize is taking the models and connecting them to associated database tables and if a database is not found it will create one. Also - "force: true" will recreate the tables if there are any association changes, but which also drops all seed data that has been entered (whereas "force: false" would prevent all tables from automatically beng dropped and re-created on startup - similar to SQL's "DROP TABLE IF EXISTS"). In short: switch briefly to "true" any time the relationships between tables changes, so that the tables will be re-created. Afterwards, switch back to "false".
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});