import {UserRepository} from '../repository/user.repository.js';

export class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
}