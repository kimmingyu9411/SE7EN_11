const CartRepository = require('../repository/cart.repository.js');

class CartService{
    constructor(){
        this.cartRepository = new CartRepository();
    }
    getCart = async (user) => {
      return await this.cartRepository.findById(user.id);
    }
  //장바구니 상품 추가
  addProductInCart = async (user, productId, quantity) => {
    try {
      return await this.cartRepository.addNewProduct(user, productId, quantity);
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 상품 수정
  updateProductInCart = async (user, productId, quantity) => {
    try {
      return await this.cartRepository.updateProductInCart(user, productId, quantity);
    } catch (err) {
      console.log(err);
    }
  };

  //장바구니 상품 삭제
  deleteProductsInCart = async ( user, removeList, isOrdered ) => {
    try {
      return await this.cartRepository.deleteProductsInCart(
        user,
        removeList,
        isOrdered
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

