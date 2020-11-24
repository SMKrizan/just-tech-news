// 'Model' class is what/where local models will be created using 'extends' keyword
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create user model whereby 'User' class will inherit all functionality of 'Model' class
class User extends Model {}

// using 'init' method to define table columns and configuration, passing in two methods as arguments
User.init(
    // defines columns and data types for those columns
    {
        // define 'id' column
        id: {
            // use special Sequelize DataTypes object to provide the type of data
            type: DataTypes.INTEGER,
            // this is equivalent to SQL's 'not null'
            allowNull: false,
            // assign this as primary key; Sequelize would add one automatically but best to explicitly define this for readability
            primaryKey: true,
            // set to auto-increment
            autoIncrement: true
        },
        // define 'username' column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define 'email' column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // prevents duplicate email values
            unique: true,
            // with 'allowNull' set to false, data can be run through validators before creating table data
            validate: {
                isEmail: true
            }
        },
        // define 'password' column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this establishes requirement for number of characters in password
                len: [4]
            }
        }
    },
    // configures table options
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        
        // pass in imported sequelize connection (the direct connection to our database)
        sequelize,
        // do not automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // do not pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }  
);

module.exports = User;