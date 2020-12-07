const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// the conventions utilized here wrt naming follows the REST architectural pattern (Representational State Transfer), creating what is known as a "ReSTful API" which (among others) applies the following guidelines: 1) use endpoint names that describe the data with which endpoints will be interfacing, 2) use HTTP methods like GET, POST etc... to describe action being performed by endpoint interface, and 3) use associated error codes, e.g. 400, 404, 500 etc.
// GET /api/users
router.get('/', (req, res) => {
    // access 'User' model and run 'findAll()' method (equivalent to SQL's "SELECT * FROM users") so that when client makes GET request to this specific endpoint, all users will be selected from the user table in the db and sent back as JSON
    User.findAll({
        // if we want to exclude more than one attribute, just add to the array
        attributes: { exclude: ['password'] } 
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // passing an argument into the 'findOne' method (equivalent to SQL's "SELECT * FROM users WHERE id = 1")
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // using 'create' method to pass in key/value pairs where keys are defined in User model and values are input by client and pulled from req.body (equivalent in SQL to INSERT INTO users (username, email, password) VALUES ("uname", "uem", upwd")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // provides access to user's user_id, username and indicates whether or not user is logged in
    .then(dbUserData => {
        // this callback ensures the session is created prior to sending response
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            // response is sent only after previous code runs
            res.json(dbUserData);
        });
    })       
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST method carries the request parameter within the req.body (as opposed to the carrying the parameter appended in the URL string as is the case with GET) which makes POST a more secure way to transfer data from client to server
router.post('/login', (req, res) => {
    // query user table using 'fineOne' method for email as entered by user and assign it to 'req.body.email'
    User.findOne({
        // looks for user with specified email
        where: {
            email: req.body.email
        }
    // result of query is passed as 'dbUserData'    
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // if query is successful 'checkPassword' is called on the 'dbUserData' object using the plaintext password, called as req.body.password; the 'compareSync' method is inside of 'checkPassword' and will confirm or deny whether supplied password matches hashed password, returning a boolean to to the variable 'validPassword'
        const validPassword = dbUserData.checkPassword(req.body.password);
        console.log('validPassword: ', validPassword);
        console.log()
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in.' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // combines methods for creating and looking up data; 'req.body' provides the new data
    User.update(req.body, {
        individualHooks: true,
        where: {
            // 'req.params.id' indicates where new data should be applied; (equivalient to SQL's "UPDATE users SET username = 'dorothy', email = 'dorothy@woz.net', password = 'toto' WHERE id = 1")
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
