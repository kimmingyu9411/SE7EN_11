import { ReviewService } from "../service/reviewService.js";

export class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  getReview = (req, res, next) => {};

  createReview = (req, res, next) => {};

  updateReview = (req, res, next) => {};

  deleteReview = (req, res, next) => {};
}
