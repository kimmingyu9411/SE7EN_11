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
        set(){
            if(this.isOwner){
                this.setDataValue('point',0);
            }else{
                this.setDataValue('point',1000000);
            }
        }
    },
    address:{
        type : DataTypes.TEXT,
        allowNull:true
    }
},{timestamps:true});

module.exports = User;