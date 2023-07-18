import Order from "../database/model/order.js";

export class OrderRepository {
  async findById(id) {
    try {
      const order = await Order.findByPk(id);
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addNewProduct(orderId, productData) {
    try {
      const createdProduct = await OrderProducts.create({
        orderId,
        productName: productData.productName,
        price: productData.price,
      });

      // 생성된 상품 정보 반환
      return { createdProduct, isSuccessful: true };
    } catch (error) {
      console.error(error);
      throw error;
      return { message: "상품 추가에 실패하였습니다.", isSuccessful: false };
    }
  }

  async updateProduct(orderId, productId, productData) {
    try {
      // OrderProducts 모델을 이용하여 해당 주문(orderId)의 상품(productId)을 수정하는 로직을 작성해야 합니다.
      // productData로 업데이트할 정보를 OrderProducts 테이블에 반영하는 등의 작업이 필요합니다.
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProductInOrder(orderId, productId) {
    try {
      // OrderProducts 모델을 이용하여 해당 주문(orderId)의 상품(productId)을 삭제하는 로직을 작성해야 합니다.
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      // Order 모델을 이용하여 주문(orderId)을 삭제하는 로직을 작성해야 합니다.
      // 필요에 따라 관련된 OrderProducts 테이블의 데이터도 함께 삭제하는 등의 작업이 필요합니다.
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
