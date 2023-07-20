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
    const productId = req.params;

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

  updateProduct = async (req, res, next) => {
    const userId = req.locals.user;
    const { storeId, productId } = req.params;
    const { name, price, productImage } = req.body;

    const updateProduct = await this.productService.updateProduct(
      productId,
      storeId,
      userId,
      name,
      price,
      category,
      productImage
    );
    if (updateProduct.status === 400) {
      res.status(400).json({ message: updateProduct.errorMessage });
    } else {
      res.status(200).json({ message: "제품 정보 수정을 완료했습니다." });
    }
  };

  deleteProduct = async (req, res, next) => {
    const userId = req.locals.user;
    const { storeId, productId } = req.params;

    const deleteProduct = await this.productService.deleteProduct(
      productId,
      storeId,
      userId
    );
    if (deleteProduct.status === 400) {
      res.status(400).json({ message: deleteProduct.errorMessage });
    } else {
      res.status(200).json({ message: "상품이 삭제되었습니다." });
    }
  };
}
module.exports = ProductController;
