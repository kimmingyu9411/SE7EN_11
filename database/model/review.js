const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Review = connector.sequelize.define('review',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    }
},{timestamps:true});

module.exports = Review;