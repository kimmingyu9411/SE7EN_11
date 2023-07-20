const Product = require("../database/model/product");

class ProductRepository {
  async createProduct(name, price, category, productImage, storeId) {
    console.log(storeId);
    try {
      const existingProduct = await Product.findOne({ where: { name } });

      if (existingProduct) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 상품명입니다.",
        };
      }
      const product = await Product.create({
        name,
        price,
        category,
        productImage,
        storeId,
      });
      return product;
    } catch (error) {
      console.error("상품 등록 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 등록 중 오류가 발생했습니다.",
      };
    }
  }

  async getCategoryProduct(category, storeId) {
    try {
      const products = await Product.findAll({
        where: { category, storeId },
      });
      if (!products[0]) {
        return { message: "해당 물품이 존재하지 않습니다." };
      }
      return products;
    } catch (error) {
      console.error("카테고리 별 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "카테고리 별 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async getDetailProduct(productId) {
    try {
      const product = await Product.findByPk(productId.productId);
      return product;
    } catch (error) {
      console.error("상품 상세 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 상세 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateProduct(productId, storeId, userId) {
    try {
      const [updatedRowsCount, updatedProducts] = await Product.update(
        { storeId, userId },
        { where: { id: productId } }
      );

      if (updatedRowsCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 상품을 찾지 못했습니다.",
        };
      }

      return updatedProducts[0];
    } catch (error) {
      console.error("상품 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteProduct(productId, storeId, userId) {
    try {
      const deletedRowCount = await Product.destroy({
        where: { id: productId, storeId, userId },
      });

      if (deletedRowCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 상품을 찾지 못했습니다.",
        };
      }

      return deletedRowCount;
    } catch (error) {
      console.error("상품 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 삭제 중 오류가 발생했습니다.",
      };
    }
  }
}
module.exports = ProductRepository;
