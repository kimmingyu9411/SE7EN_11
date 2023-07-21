const { DataTypes } = require("sequelize");
const connector = require("../db.js");

const Cart = connector.sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const products = this.ProductList;
        if (products.length == 0) {
          return 0;
        } else {
          let total = 0;
          products.forEach((item) => {
            const price = item.price * item.CartProduct.quantity;
            total += price;
          });
          return total;
        }
      },
    },
  },
  { timestamps: false }
);

module.exports = Cart;
