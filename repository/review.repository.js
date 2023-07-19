// import Review from '../database/model/review.js';

// class ReviewRepository{
//     createReview(){}
//     updateReview(){}
//     deleteReview(){}
// }

// module.exports = ReviewRepository;

const Review = require("./review"); // Review 모델을 불러옵니다.

class ReviewRepository {
  async createReview(userId, productId, content, star) {
    try {
      const review = await Review.create({ userId, productId, content, star });
      return review;
    } catch (error) {
      console.error("리뷰 생성 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 생성 중 오류가 발생했습니다.",
      };
    }
  }

  async getReviewById(userId) {
    try {
      const review = await Review.findByPk(userId);
      return review;
    } catch (error) {
      console.error("리뷰 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async getAllReviews() {
    try {
      const reviews = await Review.findAll();
      return reviews;
    } catch (error) {
      console.error("리뷰 목록 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 목록 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateReview(userId, star, content) {
    try {
      const [updatedRowsCount, updatedReviews] = await Review.update(
        { star, content },
        { where: { userId } }
      );

      if (updatedRowsCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 ID의 리뷰를 찾지 못했습니다.",
        };
      }

      return updatedReviews[0];
    } catch (error) {
      console.error("리뷰 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteReview(userId) {
    try {
      const deletedRowCount = await Review.destroy({ where: { userId } });

      if (deletedRowCount === 0) {
        return {
          status: 400,
          errorMessage: "해당 ID의 리뷰를 찾지 못했습니다.",
        };
      }

      return deletedRowCount;
    } catch (error) {
      console.error("리뷰 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 삭제 중 오류가 발생했습니다.",
      };
    }
  }
}

module.exports = new ReviewRepository();
