const CartService = require('../service/cartService.js');

class CartController {
  constructor() {
    this.cartService = new CartService();
  }
  
  getCart = async (req, res, next) => {
    const user = res.locals.user;
    try {
      const cart = await this.cartService.getCart(user);
      res.status(200).json({
        message: " 장바구니 조회 성공",
        cart
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "주문 조회 실패",
      });
    }
  }
  
  insertProductToCart = async (req, res, next) => {
    const user = res.locals.user;
    const productId = req.param.productId;
    const quantity = req.body.quantity;
    const result = await this.cartService.addProductInCart(user,productId,quantity);

    if(result.isSuccessful){
      res.status(200).json({
        message:"장바구니에 추가되었습니다."
      })
    }else{
      res.status(400).json({
        message:"장바구니에 추가가 실패하였습니다."
      })
    }
  };

  updateCart = async (req, res, next) => {
    const user = res.locals.user;
    const quantity = req.body.quantity;
    const productId = req.query.id;
    const result = await this.cartService.updateProductInCart(user,productId,quantity);

    if(result.isSuccessful){
      res.status(200).json({
        message:"success.."
      })
    }else{
      res.status(400).json({
        message:"failed.."
      })
    }
  };

  deleteCart = async (req, res, next) => {
    const { isOrdered, removeList } = req.body;
    const user = res.locals.user;

    const result = await this.cartService.deleteProductsInCart(user, removeList, isOrdered);

    if(result.isSuccessful){
      res.status(200).json({
        message:"success.."
      })
    }else{
      res.status(400).json({
        message:"failed.."
      })
    }
  };
}

module.exports = CartController