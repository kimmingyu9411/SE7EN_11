const {DataTypes} = require('sequelize');
const connector = require('../db.js');

const CartProduct = connector.sequelize.define('CartProduct',{
    quantity:{
        type : DataTypes.INTEGER,
        allowNull:false
    }
},{freezeTableName:true,timestamps:false});

module.exports = CartProduct;