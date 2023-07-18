import { ProductService } from "../service/productService.js";

export class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProduct = (req, res, next) => {};

  createProduct = (req, res, next) => {};

  updateProduct = (req, res, next) => {};

  deleteProduct = (req, res, next) => {};
}
