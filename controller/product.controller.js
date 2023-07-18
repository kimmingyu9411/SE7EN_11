const ProductService = require('../service/productService.js')

class ProductController{
    constructor(){
        this.productService = new ProductService();
    }
}

module.exports = ProductController;