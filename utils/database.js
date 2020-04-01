const Sequelize = require('sequelize');

const sequelize = new Sequelize('Node-complete', 'root', '9G;mak!1377', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;