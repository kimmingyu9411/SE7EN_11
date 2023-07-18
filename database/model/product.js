const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Product = connector.sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    menuImage:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{timestamps:true});

module.exports = Product;