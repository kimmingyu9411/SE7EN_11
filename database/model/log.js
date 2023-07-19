const {DataTypes} = require('sequelize');
const connector = require('../db.js');

const Log = connector.sequelize.define('log',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    totalPrice:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
},
{
    createdAt:true,
    updatedAt:false
});

module.exports = Log;