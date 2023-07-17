import {StoreService} from '../service/storeService.js';

export class StoreController{
    constructor(){
        this.storeService = new StoreService();
    }
}