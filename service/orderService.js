import { OrderRepository } from "../repository/order.repository.js";

export class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  //장바구니 상품 추가
  insertOrder = async ({ productName, price }) => {
    try {
      return await this.productRepository.createOrder(productName, price);
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 상품 수정
  updateOrder = async ({ productCount }) => {
    try {
      return await this.productRepository.updateOrder(productCount);
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 상품 삭제
  deleteOrder = async ({ userId, orderId, productId }) => {
    try {
      return await this.productRepository.deleteOrder(
        userId,
        orderId,
        productId
      );
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 주문하기
  createOrder = async ({ productId, productCount, totalPrice }) => {
    try {
      return await this.productRepository.createOrder(
        productId,
        productCount,
        totalPrice
      );
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 주문 취소하기
  cancelOrder = async ({ orderId }) => {
    try {
      return await this.productRepository.cancelOrder(orderId);
    } catch (err) {
      console.log(err);
    }
  };
}
