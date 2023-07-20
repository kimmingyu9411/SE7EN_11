const Cart = require('../database/model/cart.js');
const Product = require('../database/model/product.js');

class CartRepository {
  async findById(id) {
    const cart = await Cart.findOne({
      where:{
        userId:id
      },
      include:{
        model:Product,
        as:'ProductList',
        attributes:['name','price']
      }
    });
    if(cart){
      return cart;
    }else{
      await Cart.create({userId:id});
      const cart = await Cart.findOne({
        where:{
          userId:id
        },
        include:{
          model:Product,
          as:'ProductList',
          attributes:['name','price']
        }
      });
      return cart
    }
    
  }
  async addNewProduct(user, productId){
    try {
      const product = await Product.findByPk(productId);
      const cart = await Cart.findOne(
        {
          where:{
            userId : user.id
          },
          include:{
            model:Product,
            as:'ProductList',
            attributes:['name','price']
          }
        }
      );

      if(!await cart.hasProductList(product)){
        await cart.addProductList(product,{through:{quantity:1}});
        return {isSuccessful:true}
      }else{
        cart.set
        await cart.setProductList(product,{through:{quantity:quantityOfProduct+1}});
        return {isSuccessful:true}
      }
    } catch (e) {
      console.error(e);
      return {isSuccessful:false};
    }
  }
  updateProduct() {}
  deleteProductInOrder() {}
  deleteOrder() {}
}

module.exports=CartRepository;