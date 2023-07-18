const DataTypes = require('sequelize').DataTypes;
const connector = require('../db.js');

const Store = connector.sequelize.define('store',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    }
},{timestamps:true});

module.exports = Store;