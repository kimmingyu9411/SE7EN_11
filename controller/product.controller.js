import {ProductService} from '../service/productService.js'

export class ProductController{
    constructor(){
        this.productService = new ProductService();
    }
}