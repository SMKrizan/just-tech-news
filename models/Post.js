const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model
class Post extends Model { 
    // 'static' indicates the 'upvote' method is based on the 'Post' model and not an instance method, like the one used with the 'User' model; will pass in the value of req.body, 'body, and an object of the models, 'models', as parameters
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        // indicates who posted the news article
        user_id: {
            type: DataTypes.INTEGER,
            // establishes connection between post and user (id is primary key and user is foreign key)
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // configuration of metaData in second parameter of 'init' method
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);

module.exports = Post;