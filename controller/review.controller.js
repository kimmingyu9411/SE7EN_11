import {ReviewService} from '../service/reviewService.js'

export class ReviewController{
    constructor(){
        this.reviewService = new ReviewService();
    }
}