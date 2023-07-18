const ProductService = require('../service/productService.js')

class ProductController{
    constructor(){
        this.productService = new ProductService();
    }
    getProduct = (req, res, next) => {};

    createProduct = (req, res, next) => {};

    updateProduct = (req, res, next) => {};

    deleteProduct = (req, res, next) => {};
}

module.exports = ProductController;