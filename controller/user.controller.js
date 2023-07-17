import {UserService} from '../service/userService.js';

export class UserController{
    constructor(){
        this.userService = new UserService();
    }
}