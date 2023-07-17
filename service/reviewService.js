import {ReviewRepository} from '../repository/review.repository.js';

export class ReviewService{
    constructor(){
        this.reviewRepository = new ReviewRepository();
    }
}