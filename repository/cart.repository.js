const Cart = require('../database/model/cart.js');
const Product = require('../database/model/product.js');
const Log = require('../database/model/log.js');
const sq = require('../database/db.js').sequelize;

class CartRepository {
  async findById(id) {
    const cart = await Cart.findOne({
      where:{
        userId:id
      },
      include:{
        model:Product,
        as:'ProductList',
        attributes:['id','name','price']
      }
    });
    return cart;
  }
  async addNewProduct(user, productId, quantity){
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
            attributes:['id','name','price']
          }
        }
      );
        
      if(!await cart.hasProductList(product)){
        await cart.addProductList(product,{through:{quantity}});
        return {isSuccessful:true}
      }else{
        const productList = cart.dataValues.ProductList;

        let beforeQuantity;
        productList.forEach(v=>{
          if(v.dataValues.name == product.dataValues.name){
            beforeQuantity = v.dataValues.CartProduct.dataValues.quantity;
          }
        });

        await cart.addProductList(product,{through:{quantity:beforeQuantity+1}});
        return {isSuccessful:true}
      }
    } catch (e) {
      console.error(e);
      return {isSuccessful:false};
    }
  }
  async updateProductInCart(user, productId, quantity){
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
            attributes:['id','name','price']
          }
        }
      );

      const productList = cart.dataValues.ProductList;

      let beforeQuantity;
      productList.forEach(v=>{
        if(v.dataValues.name == product.dataValues.name){
          beforeQuantity = v.dataValues.CartProduct.dataValues.quantity;
        }
      });
      if(cart.hasProductList(product)){
        beforeQuantity+quantity<1 ? cart.removeProductList(product) : cart.addProductList(product,{through:{quantity:beforeQuantity+quantity}});
        return {isSuccessful:true}
      }else{
        return {isSuccessful:false};
      }
    } catch (e) {
      console.error(e);
      return {isSuccessful:false};
    }
  }
  async deleteProductsInCart(user, removeList, isOrdered){
    const t = await sq.transaction(); // 트랜잭션 생성
    try {
    const cart = await Cart.findOne(
        {
          where:{
            userId : user.id
          },
          include:{
            model:Product,
            as:'ProductList',
            attributes:['id','name','price','storeId'],
          }
        }
      );
      const productList = cart.dataValues.ProductList;

      if(isOrdered){ // true => 주문하기 실행 상태. 전체 리셋 후, 로그로 내역 이동

          const createdLog = await Log.create({
            userId:user.id,
            totalPrice:cart.get('totalPrice'),
            storeId:productList[0].dataValues.storeId
          },
            {
              transaction:t
            });
        
          productList.forEach(async (p)=>{
            createdLog.addPurchaseDescription(await Product.findByPk(p.dataValues.id,{transaction:t}));
          });
  
          await cart.destroy({transaction:t});
          await Cart.create({userId:user.id},{transaction:t});
          await t.commit();
          return {isSuccessful:true};
      }else{  // false => 주문하기 비실행 상태. removeList에 들어있는 상품만 삭제
          removeList.forEach(async(p)=>{
            cart.removeProductList(await Product.findByPk(p))
          });
          return {isSuccessful:true};
      }
    } catch (e) {
      console.error(e);
      await t.rollback();
      return {isSuccessful:false};
    }
  }
}

module.exports=CartRepository;