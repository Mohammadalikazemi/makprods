const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email:Sequelize.STRING,
    name:Sequelize.STRING
});

module.exports = User ;