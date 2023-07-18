const OrderService = require('../service/orderService.js');

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  getOrder = async (req, res, next) => {
    const orderId = req.params;
    const payload = res.locals.payload;

    try {
      const order = await this.orderService.getOrder(payload, orderId);
      res.status(200).json({
        message: " 주문 조회 성공",
        order,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        message: "주문 조회 실패",
      });
    }
  }
  createOrder = async (req, res, next) => {
    const payload = res.locals.payload;

    const create = await this.orderService.createOrder(payload, req.body);
  };

  updateOrder = async (req, res, next) => {
    const payload = res.locals.payload;
  };

  deleteOrder = async (req, res, next) => {
    const payload = res.locals.payload;
    const productId = req.params;
  };
}

module.exports = OrderController