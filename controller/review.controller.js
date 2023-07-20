const ReviewService = require("../service/reviewService.js");

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  createReview = async (req, res, next) => {
    const productId = req.query.id;
    const { id } = res.locals.user;
    const { content, star } = req.body;
    const createReview = await this.reviewService.createReview(
      id,
      productId,
      content,
      star
    );
    if (createReview.status === 400) {
      res.status(400).json({ message: createReview.errorMessage });
    } else {
      res.status(200).json({ message: "리뷰 작성을 성공했습니다." });
    }
  };

  updateReview = async (req, res, next) => {
    const reviewId = req.query.id;
    const { id } = res.locals.user;
    const { content, star } = req.body;

    const updateReview = await this.reviewService.updateReview(
      reviewId,
      id,
      content,
      star
    );
    if (updateReview.status === 400) {
      res.status(400).json({ message: updateReview.errorMessage });
    } else {
      res.status(200).json({ message: "리뷰 수정을 성공했습니다" });
    }
  };
  deleteReview = async (req, res, next) => {
    const reviewId = req.query.id;
    const user = res.locals.user;
    const { password } = req.body;

    const deleteReview = await this.reviewService.deleteReview(
      reviewId,
      user,
      password,
    );
    if (deleteReview.status === 400) {
      res.status(400).json({ message: deleteReview.errorMessage });
    } else {
      res.status(200).json({ message: "리뷰 삭제를 완료했습니다." });
    }
  };
}
module.exports = ReviewController;
