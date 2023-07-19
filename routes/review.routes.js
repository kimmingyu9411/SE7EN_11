const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const ReviewController = require('../controller/review.controller.js');
const reviewController = new ReviewController();

/*
GET '/reviews?id=:productId' 해당 품목 전체 리뷰 조회
POST '/reviews?id=:productId' 해당 품목 리뷰 등록
PUT '/reviews?id=:reviewId' 리뷰 수정
DELETE '/reviews?id=:reviewId' 리뷰 삭제
*/

router.route('/')
.post(auth.verify,reviewController.createReview)
.put(auth.verify,reviewController.updateReview)
.delete(auth.verify,reviewController.deleteReview)

module.exports = router;