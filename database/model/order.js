const {DataTypes, Model} = require('sequelize');
const connector = require('../db.js');

const Order = connector.sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    totalPrice:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
},
{
    timestamps:true
});

module.exports = Order;