const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const User = connector.sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    nickname:{
        type : DataTypes.STRING,
        allowNull:false
    },
    name:{
        type : DataTypes.STRING,
        allowNull:false
    }
},{timestamps:true});

module.exports = User;