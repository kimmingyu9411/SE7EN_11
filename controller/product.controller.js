import { ProductService } from "../service/productService.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  // 상품 조회 storeId 노필요?
  getProductsByCategory = async (req, res, next) => {
    const { category, storeId } = req.params;

    const categoryProduct = await this.productService.getCategoryProduct(
      category,
      storeId
    );
    if (categoryProduct) {
      res.status(200).json({ data: categoryProduct });
    } else {
      res.status(400).json({ message: "카테고리 조회를 실패했습니다." });
    }
  };

  getDetailProduct = async (req, res, next) => {
    const productId = req.params;

    const detailProduct = await this.productService.getDetailProduct(productId);
    if (detailProduct) {
      res.status(200).json({ data: detailProduct });
    } else {
      res.status(400).json({ message: "제품 상세조회를 실패했습니다." });
    }
  };

  createProduct = async (req, res, next) => {
    const storeId = req.params;
    const { name, price, category, productImage } = req.body;

    const createProduct = await this.productService.createProduct(
      name,
      price,
      category,
      productImage,
      storeId
    );
    if (createProduct) {
      res.status(200).json({ message: "제품 등록이 완료되었습니다." });
    } else {
      res.status(400).json({ message: "제품 등록을 실패했습니다." });
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
    if (updateProduct) {
      res.status(200).json({ message: "제품 정보 수정을 완료했습니다." });
    } else {
      res.status(400).json({ message: "제품 정보 수정을 실패했습니다." });
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
    if (deleteProduct) {
      res.status(200).json({ message: "상품이 삭제되었습니다." });
    } else {
      res.status(400).json({ message: "상품 삭제를 실패했습니다." });
    }
  };
}
module.exports = ProductController;
