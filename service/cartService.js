const CartRepository = require('../repository/cart.repository.js');

class CartService{
    constructor(){
        this.cartRepository = new CartRepository();
    }
    getCart = async (user) => {
      return await this.cartRepository.findById(user.id);
    }
  //장바구니 상품 추가
  addProductInCart = async (user, productId) => {
    try {
      return await this.cartRepository.addNewProduct(user, productId);
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

module.exports=CartService;

