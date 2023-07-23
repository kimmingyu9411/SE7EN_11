const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Review = connector.sequelize.define('review',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nickname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    star:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:true
    }
},{timestamps:true});

module.exports = Review;