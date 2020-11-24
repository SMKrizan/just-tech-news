const router = require('express').Router();
const { User } = require('../../models');

// the conventions utilized here wrt naming follows the REST architectural pattern (Representational State Transfer), creating what is known as a "ReSTful API" which (among others) applies the following guidelines: 1) use endpoint names that describe the data with which endpoints will be interfacing, 2) use HTTP methods like GET, POST etc... to describe action being performed by endpoint interface, and 3) use associated error codes, e.g. 400, 404, 500 etc.
// GET /api/users
router.get('/', (req, res) => {
    // access 'User' model and run 'findAll()' method (equivalent to SQL's "SELECT * FROM users") so that when client makes GET request to this specific endpoint, all users will be selected from the user table in the db and sent back as JSON
    User.findAll()
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

// POST /api/users
router.post('/', (req, res) => {
    // using 'create' method to pass in key/value pairs where keys are defined in User model and values are input by client and pulled from req.body (equivalent in SQL to INSERT INTO users (username, email, password) VALUES ("uname", "uem", upwd")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // combines methods for creating and looking up data; 'req.body' provides the new data
    User.update(req.body, {
        where: {
            // 'req.params.id' indicates where new data should be applied; (equivalient to SQL's "UPDATE users SET username = 'uname', email = 'uem', password = 'upwd' WHERE id = 1")
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
