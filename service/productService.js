const ProductRepository = require("../repository/product.repository.js");
const bcrypt = require("bcrypt");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  //상품 등록
  createProduct = async (name, price, category, productImage, storeId) => {
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
  getCategoryProduct = async (category, storeId) => {
    try {
      return await this.productRepository.getCategoryProduct(category, storeId);
    } catch (err) {
      console.log(err);
    }
  };

  //상품 상세 조회
  getDetailProduct = async (productId) => {
    try {
      return await this.productRepository.getDetailProduct(productId);
    } catch (err) {
      console.log(err);
    }
  };

  //상품 업데이트
  updateProduct = async (
    productId,
    user,
    name,
    price,
    category,
    password,
    productImage
  ) => {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        status: 400,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }

    let updateValues = {};
    if (name) updateValues.name = name;
    if (price) updateValues.price = price;
    if (category) updateValues.category = category;
    if (productImage) updateValues.productImage = productImage;

    try {
      return await this.productRepository.updateProduct(
        productId,
        updateValues
      );
    } catch (err) {
      console.log(err);
    }
  };

  //상품 삭제
  deleteProduct = async (productId, user, password) => {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        status: 400,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }
    try {
      return await this.productRepository.deleteProduct(productId);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ProductService;
