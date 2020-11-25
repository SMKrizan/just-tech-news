const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model
class Post extends Model { }

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