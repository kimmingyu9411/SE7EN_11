const DataTypes = require("sequelize").DataTypes;
const connector = require("../db");

const Store = connector.sequelize.define(
  "store",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }
=======
  },
  { timestamps: true }
);
>>>>>>> 34935da70365e33919d129ad419cf3e813d959bc

module.exports = Store;
