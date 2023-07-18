const ReviewRepository = require('../repository/review.repository.js');

class ReviewService{
    constructor(){
        this.reviewRepository = new ReviewRepository();
    }
}

module.exports = ReviewService;