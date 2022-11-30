
import { dataBase } from "../dataBase/data.js";

 
 export class Post {
    textPost;

    constructor(textPost) {
        this.textPost = textPost;
        this.comments=[];
    }

   
    newComment(comment) {
        this.comments.push(comment)
    }

    deletComment(comment){
        const myIndex = this.comments.indexOf(comment); //procura o index do meu amigo na MINHA lista
            this.comments.splice(myIndex, 1);
    }
    

  
}

 
// function postar(){
   

//     const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
//     const index = dataBase.findIndex(item => item.email == UserLocalStorage)
//     const user = dataBase[index];

//     console.log(user)

//     location.href = "../feed/feed.html";
    
// }

// function postar( ){

  

// //     // event.preventDefault();
  
// //     // const login = document.getElementById("login").value;
// //     const text = document.getElementById("textArea").value;
// //     console.log(text)
  
// //     const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
// //     const index = dataBase.findIndex(item => item.email == UserLocalStorage)
// //     const user = dataBase[index];

// //     console.log(user)
  
  
// // //     if(dataBase[index].password === password){
// // //         const thisUser = dataBase[index].email;
        
// // //         alert("sucesso");
// // //         StorageCreator(thisUser)
  
// // //         location.href = "../feed/feed.html";
        
// // //         return ;
// // //     } else { alert('Usuário ou senha incorretos')
// // //   }

 
//     const postText = document.getElementById("textArea").value;
    
//     const usuario = window.localStorage.getItem('user').replaceAll('"','')
    
//     // console.log(usuario)

//     // console.log(dataBase)
//     const index = dataBase.findIndex(item => item.email == usuario)

//     // console.log(index)

//     const newUserPost = new Post (postText)

//     dataBase[index].newPost(newUserPost)

//     console.log(dataBase[index])

//     location.href = "../feed/feed.html";
  
//   };
  