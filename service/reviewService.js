const ReviewRepository = require("../repository/review.repository.js");
const bcrypt = require("bcrypt");

class ReviewService {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }
  //리뷰 작성
  createReview = async (id, productId, content, star) => {
    try {
      return await this.reviewRepository.createReview(
        id, // <= 키 값으로 user테이블에 들어가서 nickname 가져오기
        productId,
        content,
        star
      );
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 수정
  updateReview = async (reviewId, id, content, star) => {
    try {
      let updateValues = {};
      if (content) updateValues.content = content;
      if (star) updateValues.star = star;
      return await this.reviewRepository.updateReview(
        reviewId,
        id,
        updateValues
      );
    } catch (err) {
      console.log(err);
    }
  };

  //리뷰 삭제
  deleteReview = async (reviewId, user, password) => {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        status: 400,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }

    try {
      return await this.reviewRepository.deleteReview(reviewId, user.id);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ReviewService;
