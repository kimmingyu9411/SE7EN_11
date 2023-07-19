const ReviewRepository = require("../repository/review.repository.js");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }
  //리뷰 작성
  createReview = async (userId, productId, content, star) => {
    try {
      return await this.reviewRepository.createReview({
        userId,
        productId,
        content,
        star,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 수정
  updateReview = async (userId, productId, reviewId, content, star) => {
    try {
      return await this.reviewRepository.updateReview({
        userId,
        productId,
        reviewId,
        content,
        star,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 삭제
  deleteReview = async (userId, productId, reviewId) => {
    try {
      return await this.reviewRepository.deleteReview({
        userId,
        productId,
        reviewId,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ReviewService;
