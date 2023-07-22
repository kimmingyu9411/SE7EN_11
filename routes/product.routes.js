const router = require("express").Router();
const { auth } = require("../middleware/auth.js");
const ProductController = require("../controller/product.controller.js");
const productController = new ProductController();

/*

await fetch('http:localhost:8080/products`${category}`)
    GET '/products/:productId' 제품 상세 조회
    GET '/products?category=categoryName' 카테고리 별 조회
    POST '/products?id=:storeId' 상점 메뉴 등록
    PUT '/products/:productId' 상점 메뉴 수정
    DELETE '/products/:productId' 상점 메뉴 삭제
*/

router.get("/:productId", productController.getDetailProduct);

router
  .route("/")
  .get(productController.getProductsByCategory)
  .post(auth.verify, productController.createProduct);
// .put(auth.verify,productController.updateProduct)
// .delete(auth.verify,productController.deleteProduct)

router
  .route("/:productId")
  .get(productController.getDetailProduct)
  .put(auth.verify, productController.updateProduct)
  .delete(auth.verify, productController.deleteProduct);

module.exports = router;
