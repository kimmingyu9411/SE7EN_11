import { ReviewRepository } from "../repository/review.repository.js";

export class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  //리뷰 작성
  createReview = async ({
    userId,
    nickname,
    storeId,
    productId,
    reviewContent,
    starScore,
  }) => {
    try {
      return await this.reviewRepository.createReview({
        userId,
        nickname,
        storeId,
        productId,
        reviewContent,
        starScore,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 수정
  updateReview = async ({
    userId,
    storeId,
    productId,
    reviewId,
    reviewContent,
    starScore,
  }) => {
    try {
      return await this.reviewRepository.updateReview({
        userId,
        storeId,
        productId,
        reviewId,
        reviewContent,
        starScore,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 삭제
  deleteReview = async ({ userId, storeId, productId, reviewId }) => {
    try {
      return await this.reviewRepository.updateReview({
        userId,
        storeId,
        productId,
        reviewId,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
