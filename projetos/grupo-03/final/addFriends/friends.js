
import { dataBase } from "../dataBase/data.js";

window.btnAddRemoveFriends = btnAddRemoveFriends; // para funcionar a função OnClick no html

function renderFriends(){
    const ul = document.querySelector("ul") 
    ul.innerHTML = null 
    const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
    const index = dataBase.findIndex(item => item.email == UserLocalStorage)
    const user = dataBase[index];


    dataBase.forEach((element) => {

        if( !(element.email == UserLocalStorage) ){ //condição para não mostrar o próprio usuário para add amigo. 

        const li = document.createElement("li");
        li.classList.add('post');

        const divFriendsContainer  = document.createElement("div");
        divFriendsContainer.classList.add("friendsContainer");

            const divAvatarIcon = document.createElement("div");
            divAvatarIcon.classList.add("avatarIcon");
                divAvatarIcon.innerHTML = '<img src="../assets-front/user-profile.svg" alt="">';

            
            const divUserNameContainer = document.createElement("div");
            divUserNameContainer.classList.add("userNameContainer");

                const divNameAndUsername = document.createElement("div");
                divNameAndUsername.classList.add("nameAndUsername");

                    const strongNameAndUsername = document.createElement("strong");
                    strongNameAndUsername.innerText = element.fullName;

                    const spanNameAndUsername = document.createElement("span")
                    spanNameAndUsername.innerText = `@${element.userName}`;


                const divBtnAddFriends = document.createElement('div');
                divBtnAddFriends.classList.add("btnAddFriends");
                divBtnAddFriends.id = "divButtonAdd-"+ element.email

                    const button = document.createElement("button");
                    button.id = "buttonAdd-"+ element.email
                    button.setAttribute("onclick",`btnAddRemoveFriends('${element.email}','dataBase')`);

                    if(user.friends.includes(element)){
                        button.innerHTML = 'remover'
                        divBtnAddFriends.style.backgroundColor = 'gray'
                    } else {
                        button.innerHTML = 'adicionar'
                        divBtnAddFriends.style.backgroundColor = 'blue'
                        


                    }
                    


        ul.appendChild(li);
        li.appendChild(divFriendsContainer);
            divFriendsContainer.appendChild(divAvatarIcon);
            divFriendsContainer.appendChild(divUserNameContainer);
                divUserNameContainer.appendChild(divNameAndUsername);
                    divNameAndUsername.appendChild(strongNameAndUsername);
                    divNameAndUsername.appendChild(spanNameAndUsername);
                divUserNameContainer.appendChild(divBtnAddFriends);
                divBtnAddFriends.appendChild(button)

        
        }
    })
}

function btnAddRemoveFriends(userEmail){

    // return console.log(userEmail)
    const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
    const index = dataBase.findIndex(item => item.email == UserLocalStorage)
    const user = dataBase[index];

    const indexFriend = dataBase.findIndex(item => item.email == userEmail)
    const userFriend = dataBase[indexFriend];
    const botao = document.getElementById('buttonAdd-'+userEmail)
    const divBtnAddFriendsColor = document.getElementById('divButtonAdd-'+userEmail)


    if(user.friends.includes(userFriend)){
        user.deleteFriendship(userFriend)
        botao.innerHTML = 'adicionar'
        divBtnAddFriendsColor.style.backgroundColor = 'blue'
        
    }else{
        user.newFriendship(userFriend);
        botao.innerHTML = 'remover'
        divBtnAddFriendsColor.style.backgroundColor = 'gray'
        
    }

        console.log(user)
    
    
}






renderFriends();