import { Entities } from "./Entities.class.js";
 
export  class User extends Entities {
    userName; //@
    fullName;
    password;
    email;

    constructor(fullName, password, email, userName){
        super(Entities.id);
        this.fullName = fullName;
        this.password = password;
        this.email = email;
        this.userName = userName;
        this.post=[];
        this.friends=[];

    }

    get password () {
        return this.password;
    }

    set password (newPassword) {
        this.password = newPassword;
    }

    newPost(post){
        this.post.push(post)
        // console.log(this.post)
    }

    newFriendship(friend) {
        if(!this.friends.includes(friend)) { // checa se o user do meu amigo existe na minha lista de amigos (! se ele não estiver vai para o if)
            // friend.friends.push(friend); // add eu como amigo dele
            this.friends.push(friend); // add ele como meu amigo
        }
       
    }

    deleteFriendship(friend) {
            const myIndex = this.friends.indexOf(friend); //procura o index do meu amigo na MINHA lista
            this.friends.splice(myIndex, 1); // deleta meu amigo na minha lista
    }

    deletePost(text){
        const index = this.post.indexOf(text) 
        // console.log(index)
        this.post.splice(index, 1); 
    }

    editPost(old_post,new_post) {
        this.post.forEach((element,i) => {
            if( element == old_post){
                this.post[i].textPost = new_post
            }
        });
        //console.log(this.post)
    }



}
