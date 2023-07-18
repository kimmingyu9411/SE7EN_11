const ProductRepository = require('../repository/product.repository.js');

class ProductService{
    constructor(){
        this.productRepository = new ProductRepository();
    }
}

module.exports = ProductService;