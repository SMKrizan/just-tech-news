const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    // now that we are using a template engine, we can use "render" rather than "res.send()" or "res.sendFile()" for the response. Here we are asking for the "homepage.handlebars" template to be rendered. Handlebars will feed this 'homepage' template into the main.handlebars template and respond with a complete html file.
    res.render('homepage', {
        id: 1,
        post_url: "https://handlebarsjs.com/guide/",
        title: "Handlebars Docs",
        created_at: new Date(),
        vote_count: 10,
        comments: [{}, {}],
        user: {
            username: "test_user"
        }
    });
});

module.exports = router;