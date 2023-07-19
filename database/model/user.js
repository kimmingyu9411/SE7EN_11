const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const User = connector.sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nickname:{
        type : DataTypes.STRING,
        allowNull:false
    },
    name:{
        type : DataTypes.STRING,
        allowNull:false
    },
    isOwner:{
        type : DataTypes.BOOLEAN,
        allowNull:false
    },
    email:{
        type : DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    point:{
        type : DataTypes.INTEGER,
        allowNull:false
    },
    address:{
        type : DataTypes.TEXT,
        allowNull:true
    },
    token:{
        type : DataTypes.STRING,
        allowNull:true
    }
},{timestamps:true});

module.exports = User;