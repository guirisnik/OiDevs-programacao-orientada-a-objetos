import { Post } from "../newPost/newpost.js";
import { User } from "../user/User.class.js";
import { Admin } from "../user/Admin.class.js";


export const dataBase = [];



const user0 = new User ("gabiCeranto", "admin", "gabi@gmail.com","gaabiceranto")
const user1 = new User ("Alexandre Oliveira", "macacoAmarelo", "xandesantucci@gmail.com","xandes")
const user2 = new User ("Adriana Yamashita", "formigaVermelha", "dri@gmail.com","drib")
const admin3 = new Admin ("Gabriel", "senha", "gabriel@gmail.com","Gab")
const user4 = new User ("GiselleP.", "formigaRosa", "giselle@gmail.com", "GIii")
const user5 = new User ("Larissah", "capivaraMarrom", "lari@gmail.com", "Lalala")



// const post00 = new Post ("texto0 user 0")
// user0.newPost(post00)

dataBase.push(user0, user1, user2, admin3, user4,user5)

const post10 = new Post("Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dignissimos consectetur.")
const post11 = new Post("texto1 user 1")
const post12 = new Post("texto2 user 1")
user1.newPost(post10)
user1.newPost(post11)
user1.newPost(post12)

// console.log(dataBase)
// console.log(dataBase[1])


// const post20 = new Post("texto0 user 2")
// const post21 = new Post("texto1 user 2")
// user2.newPost(post20)
// user2.newPost(post21)

// const post30 = new Post("texto0 user 3")
// const post31 = new Post("texto1 user 3")
// const post32 = new Post("texto2 user 3")

// admin3.newPost(post30)
// admin3.newPost(post31)
// admin3.newPost(post32)

// ***************************** Comentar Post************************
// const post60 = new Post("texto0 MEU POST")
// post60.newComment("novo Comentario")
// user1.newPost(post60)

// console.log(dataBase[1])


// ***************************** Editar e deletar Post************************

// user1.deletePost(post10)


user1.editPost(post12,'este é comentário editado')
console.log(dataBase[1])



user0.newFriendship(user1)
user0.newFriendship(user2)

// console.log(dataBase[0])

// user0.newFriendship(user1)
// console.log(dataBase[0])

// user0.deleteFriendship(user1)
// console.log(dataBase[0])


// const UserLocalStorage = 'gabriel@gmail.com'
// const index = dataBase.findIndex(item => item.email == UserLocalStorage)

// if(dataBase[index].admin){
// dataBase[index].deleteUser(dataBase,'xandesantucci@gmail.com')
// }


// console.log(dataBase);





