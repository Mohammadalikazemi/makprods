const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false

    },
    descriptions: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) ;

module.exports = Product;