const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// defines relationship of 'Post' to 'User' mdoels; specifies that a post can belong to one user and again referencing link to foriegn key ('user_id' in 'Post' model)
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// the following two methods allow the 'User' and 'Post' models to query one another's vote-related info
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// defines association between 'User' and 'Post' models; references 'id' column in user model via link to corresponding foreign key pair ('user_id' in 'Post' model)
User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };