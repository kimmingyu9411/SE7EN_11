// import Review from '../database/model/review.js';

// class ReviewRepository{
//     createReview(){}
//     updateReview(){}
//     deleteReview(){}
// }

// module.exports = ReviewRepository;

const Review = require("../database/model/review"); // Review 모델을 불러옵니다.

class ReviewRepository {
  async createReview(id, productId, content, star) {
    try {
      const review = await Review.create({
        userId: id,
        productId,
        content,
        star,
      });
      return review;
    } catch (error) {
      console.error("리뷰 생성 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 생성 중 오류가 발생했습니다.",
      };
    }
  }
  //추가 요구 사항 고려
  //프로덕트 => 리뷰 // 한 사람이 주문을 여러번하면 여러개의 리뷰 작성 가능
  //리뷰 조회 시 nickname 도 반환되게 변경하기

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

  async updateReview(reviewId, id, updateValues) {
    try {
      const updatedReview = await Review.update(updateValues, {
        where: { id: reviewId, userId: id },
      });

      if (!updatedReview[0]) {
        return {
          status: 400,
          errorMessage: "해당 ID의 리뷰를 찾지 못했습니다.",
        };
      }

      return {
        status: 200,
        Message: "리뷰 업데이트가 되었습니다.",
      };
    } catch (error) {
      console.error("리뷰 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteReview(reviewId, id) {
    try {
      const deletedReview = await Review.destroy({
        where: { id: reviewId, userId: id },
      });

      if (!deletedReview) {
        return {
          status: 400,
          errorMessage: "해당 상품이 존재하지 않습니다.",
        };
      }

      return { message: "해당 리뷰가 삭제되었습니다." };
    } catch (error) {
      console.error("리뷰 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "리뷰 삭제 중 오류가 발생했습니다.",
      };
    }
  }
}

module.exports = ReviewRepository;
