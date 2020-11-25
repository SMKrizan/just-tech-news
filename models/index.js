const User = require('./User');
const Post = require('./Post');

// defines association between 'User' and 'Post' models; references 'id' column in user model via link to corresponding foreign key pair ('user_id' in 'Post' model)
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// defines relationship of 'Post' to 'User' mdoels; specifies that a post can belong to one user and again referencing link to foriegn key ('user_id' in 'Post' model)
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };