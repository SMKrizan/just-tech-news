// 'Model' class is what/where local models will be created using 'extends' keyword
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

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
        // 'hooks' property is added to 2nd object of User.init()
        // hooks: {
        //     // sets up 'beforeCreate' lifecycle "hook" functionality to fire just before a new "user" is created --executes 'bcrypt' hash function on the plaintext password
        //     beforeCreate(userData) {
        //         // passes in 'userData' (pre-hash data) object containing plaintext password and saltRound value of 10; resulting hashed password is then passed to Promise object as 'newUserData' (post-hash data) object with hashed password property. Finally, 'return' exits out of function.
        //         return bcrypt.hash(userData.password, 10).then(newUserData => {
        //             return newUserData
        //         });
        //     }
        // },       
        // streamlined version of the above:
        hooks: {
            // async/await combo work together to make an async function that looks more like a regular synchronous function expression; 'async' is used as prefix to function containing asynchronous function
            async beforeCreate(newUserData) {
                // 'await is prefix to asynchronous function, where value from response is assigned to 'newUserData' password property. 'newUserData' is then returned with hashed password
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // sets up beforeCreate lifecycle hook functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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