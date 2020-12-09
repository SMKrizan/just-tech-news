const { Post } = require('../models');

const postData = [
    {
        title: "Glinda's Goods Goes Public",
        post_url: "https://ozdailynews.com/press",
        user_id: 4
    },
    {
        title: "Flying Monkeys Bridge the Expanse to Kansas!",
        post_url: "https://wickedtimes.com/press",
        user_id: 5
    },
    {
        title: "TinMan Appointed as New Oz Director of Housing",
        post_url: "https://ozdailynews.com/press",
        user_id: 1
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts