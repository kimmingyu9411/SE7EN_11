import {ProductRepository} from '../repository/product.repository.js';

export class ProductService{
    constructor(){
        this.productRepository = new ProductRepository();
    }
}