const ProductService = require("../service/productService.js");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  // 상품 조회 storeId 노필요?
  getProductsByCategory = async (req, res, next) => {
    const category = req.query.category;
    const storeId = req.query.id;

    const categoryProduct = await this.productService.getCategoryProduct(
      category,
      storeId
    );
    if (categoryProduct.status === 400) {
      res.status(400).json({ data: categoryProduct.errorMessage });
    } else {
      res.status(200).json({ data: categoryProduct });
    }
  };

  getDetailProduct = async (req, res, next) => {
    const productId = req.params.productId;

    const detailProduct = await this.productService.getDetailProduct(productId);
    
    if (detailProduct.status === 400) {
      res.status(400).json({ data: detailProduct.errorMessage });
    } else {
      res.status(200).json({ data: detailProduct });
    }
  };

  createProduct = async (req, res, next) => {
    const storeId = req.query.id;

    const { name, price, category, productImage } = req.body;

    const createProduct = await this.productService.createProduct(
      name,
      price,
      category,
      productImage,
      storeId
    );
    if (createProduct.status === 400) {
      res.status(400).json({ message: createProduct.errorMessage });
    } else {
      res
        .status(200)
        .json({ message: "제품 등록이 완료되었습니다.", createProduct });
    }
  };
  // 해당 store의 사장님인지 확인하는 여부 절차 필요?
  // 예기치 못한 접근 (url로 직접 접속) 하는 경우가 있을 수 있어 로직 상의 구현도 필요하다
  // 상품 업데이트의 경우 프로필 => 사장님 => 사장님 정보 => 정보 수정 / 일반 회원 = 일반 회원 정보 수정
  updateProduct = async (req, res, next) => {
    const user = res.locals.user;
    const { productId } = req.params;
    const { name, price, productImage, category, password } = req.body;

    const updateProduct = await this.productService.updateProduct(
      productId,
      user,
      name,
      price,
      category,
      password,
      productImage
    );
    if (updateProduct.status === 400) {
      res.status(400).json({ message: updateProduct.errorMessage });
    } else {
      res.status(200).json({ message: "상품 정보 수정이 완료되었습니다." });
    }
  };

  deleteProduct = async (req, res, next) => {
    const user = res.locals.user;
    const { productId } = req.params;
    const { password } = req.body;

    const deleteProduct = await this.productService.deleteProduct(
      productId,
      user,
      password
    );

    if (deleteProduct.status === 400) {
      res.status(400).json({ message: deleteProduct.errorMessage });
    } else {
      res.status(200).json({ message: "상품이 삭제되었습니다." });
    }
  };
}
module.exports = ProductController;
