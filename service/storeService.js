import {StoreRepository} from '../repository/store.repository.js';

export class StoreService{
    constructor(){
        this.storeRepository = new StoreRepository();
    }
}