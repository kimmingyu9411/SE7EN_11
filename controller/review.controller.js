const ReviewService = require('../service/reviewService.js');

class ReviewController{
    constructor(){
        this.reviewService = new ReviewService();
    }
}

module.exports = ReviewController;