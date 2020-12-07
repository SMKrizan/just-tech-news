const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    // now that we are using a template engine, we can use "render" rather than "res.send()" or "res.sendFile()" for the response. Here we are asking for the "homepage.handlebars" template to be rendered. Handlebars will feed this 'homepage' template into the main.handlebars template and respond with a complete html file.
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                // 'user_id' enables access to username of the person who made the comment
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                // username of the person who made the post (parent)
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // passes a single post object into the homepage template; using 'model.get({ plain: true })' method in order to serialize each Sequelize object, that is, limit the response to include only the specified attributes rather than the extensive Sequelize object. Use of the '.map()' method loops through each Sequelize object and then saves the results to a new 'posts' array
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    // redirects to the homepage when there's an active session
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;