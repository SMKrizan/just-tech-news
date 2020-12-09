const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Glinda's Goods bring all the munchkins to the yard",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "I literally cannot function without Glinda's Heavenly Oils",
        user_id: 7,
        post_id: 1
    },
    {
        comment_text: "I'll believe if when I see it.",
        user_id: 6,
        post_id: 2
    },
    {
        comment_text: "I'll get you, my pretties!",
        user_id: 5,
        post_id: 2
    },
    {
        comment_text: "Let me at 'em!",
        user_id: 8,
        post_id: 2
    },
    {
        comment_text: "Couldn't happened to a better man, if I do say so myself!",
        user_id: 7,
        post_id: 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments