const Product = require("../database/model/product");
const Review = require("../database/model/review");
const Store = require("../database/model/store");
const sequelize = require("../database/db.js").sequelize;

class ProductRepository {
  async createProduct(name, price, category, productImage, storeId) {
    const t = await sequelize.transaction();
    try {
      const existingProduct = await Product.findOne({ where: { name } });

      if (existingProduct) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 상품명입니다.",
        };
      }
      const product = await Product.create(
        {
          name,
          price,
          category,
          productImage,
          storeId,
        },
        {
          transaction: t,
        }
      );

      const store = await Store.findByPk(storeId, {
        transaction: t,
      });

      await store.addProductList(product, {
        transaction: t,
      });

      await t.commit();
      return product;
    } catch (error) {
      await t.rollback();
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
      const product = await Product.findByPk(productId, {
        include: {
          model: Review,
          as: "Reviews",
        },
      });

      return product;
    } catch (error) {
      console.error("상품 상세 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 상세 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateProduct(productId, updateValues) {
    try {
      const updatedProduct = await Product.update(updateValues, {
        where: { id: productId },
      });
      if (!updatedProduct[0]) {
        return {
          status: 400,
          errorMessage: "해당 상품이 존재하지 않습니다.",
        };
      }
      return { message: "상품정보가 업데이트 되었습니다." };
    } catch (error) {
      console.error("상품 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.destroy({
        where: { id: productId },
      });

      if (!deletedProduct) {
        return {
          status: 400,
          errorMessage: "해당 상품이 존재하지 않습니다.",
        };
      }

      return { message: "해당 상품이 삭제되었습니다." };
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
