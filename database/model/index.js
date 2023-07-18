// Models
const Order = require('./order.js');
const Product = require('./product.js');
const Review = require('./review.js');
const Store = require('./store.js');
const User = require('./user.js');

// User

User.hasOne(Store);
User.hasOne(Order);
User.hasMany(Review,{foreignKey:'userId',as:'wroteReviews'});
//Product
Product.hasMany(Review,{foreignKey:'productId',as:'reviews'});
Product.belongsTo(Order);
Product.belongsTo(Store);
//Review
Review.belongsTo(User);
Review.belongsTo(Product);
//Store
Store.hasMany(Product,{foreignKey:'storeId'});
//Order
Order.hasMany(Product,{foreignKey:'orderId',as:'products'})

module.exports = [Order, Product, Review, Store, User];