import { User } from './User.class.js';



export class Admin extends User {
    
    constructor(fullName, password, email, userName){
        super(fullName, password, email, userName);
        this.admin = true;
    }
    
    deleteUser(dataBase,pessoa){
        const index = dataBase.findIndex(item => item.email === pessoa);
        dataBase.splice(index,1);    
    }
}