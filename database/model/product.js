const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Product = connector.sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    }
},{timestamps:true});

module.exports = Product;