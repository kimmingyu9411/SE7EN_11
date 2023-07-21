// Models
const Log = require('./log.js');
const Product = require('./product.js');
const Review = require('./review.js');
const Store = require('./store.js');
const User = require('./user.js');
const Cart = require('./cart.js');
const CartProduct = require('./cartProduct.js');

// User
User.hasOne(Store);
User.hasOne(Cart);
User.hasMany(Log,{as:'purchasedDescription'});
User.hasMany(Review);

// Product
Product.hasMany(Review);
Product.belongsTo(Store);
Product.belongsToMany(Cart,{through:CartProduct});
Product.belongsToMany(Log,{through:'LogProduct'});

// Cart
Cart.belongsToMany(Product,{through:CartProduct,as:'ProductList'});

// Log
Log.belongsToMany(Product,{through:'LogProduct',as:'PurchaseDescription'});

// Review
Review.belongsTo(User);
Review.belongsTo(Product,{as:'Reviews'});
// Store
Store.hasMany(Product,{as:'ProductList',foreignKeyConstraint:false});
Store.belongsTo(User);

module.exports = [Log, Product, Review, Store, User, Cart, CartProduct];