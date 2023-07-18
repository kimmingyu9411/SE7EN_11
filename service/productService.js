const ProductRepository = require("../repository/product.repository.js");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  //상품 등록
  createProduct = async ({ name, price, category, productImage, storeId }) => {
    try {
      return await this.productRepository.createProduct(
        name,
        price,
        category,
        productImage,
        storeId
      );
    } catch (err) {
      console.log(err);
    }
  };

  //카테고리 별 조회
  getCategoryProduct = async ({ category }) => {
    try {
      return await this.productRepository.getCategoryProduct(category);
    } catch (err) {
      console.log(err);
    }
  };

  //상품 상세 조회
  getDetailProduct = async ({ productId }) => {
    try {
      return await this.productRepository.getDetailProduct(productId);
    } catch (err) {
      console.log(err);
    }
  };

  //상품 업데이트
  updateProduct = async ({ productId, storeId, userId }) => {
    try {
      return await this.productRepository.updateProduct(
        productId,
        storeId,
        userId
      );
    } catch (err) {
      console.log(err);
    }
  };

  //상품 삭제
  deleteProduct = async ({ productId, storeId, userId }) => {
    try {
      return await this.productRepository.deleteProduct(
        productId,
        storeId,
        userId
      );
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductService;
