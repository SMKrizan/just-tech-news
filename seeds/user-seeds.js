const { User } = require('../models');

const userData = [
    {
        username: "dorothy",
        email: "dorothy@woz.com",
        password: "toto"
    },
    {
        username: "auntEm",
        email: "em@kansas.com",
        password: "homeagain"
    },
    {
        username: "uncleHenry",
        email: "henry@kansas.com",
        password: "homeagain"
    },
    {
        username: "glinda",
        email: "glinda@woz.com",
        password: "goodwitch"
    },
    {
        username: "wwwest",
        email: "agulch@woz.com",
        password: "flyingmonkeys"
    },
    {
        username: "scarecrow",
        email: "hunk@woz.com",
        password: "brain"
    },
    {
        username: "tinman",
        email: "hickory@woz.com",
        password: "heart"
    },
    {
        username: "cowardlyLion",
        email: "zeke@woz.com",
        password: "courage"
    }
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers  