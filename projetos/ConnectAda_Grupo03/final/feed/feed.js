
import { dataBase } from "../dataBase/data.js";

function renderFeed() {
    const ul = document.querySelector("ul") 
    ul.innerHTML = null 
    const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
    const index = dataBase.findIndex(item => item.email == UserLocalStorage)
    const user = dataBase[index];
    
    console.log(user.post)

    user.post.forEach((element) => {


            const li = document.createElement("li");
            li.classList.add('post');
                const divPostContainer  = document.createElement("div");
                divPostContainer.classList.add("postContainer");
                    const divAvatarIcon = document.createElement("div");
                    divAvatarIcon.classList.add("avatarIcon");
                        divAvatarIcon.innerHTML = '<img src="../assets-front/user-profile.svg" alt="">';
                    
                    const divUserNameAndPostContainer = document.createElement("div");
                    divUserNameAndPostContainer.classList.add("userNameAndPostContainer");
                        const divHeaderPost = document.createElement("div");
        
                            const divUserNameAndHour = document.createElement("div"); 
                                const strong = document.createElement("strong"); 
                                    strong.innerHTML = user.fullName;
                                const spanDot = document.createElement("span"); 
                                    spanDot.innerHTML = '·';
                                const spanHour = document.createElement("span"); 
                                    spanDot.innerHTML = '21h';  
                            const divbtnEditAndDeletPost = document.createElement("div");
                            divbtnEditAndDeletPost.classList.add("btnEditAndDeletPost");
                                const buttonAddRemove = document.createElement("button");
                                buttonAddRemove.innerHTML = '<img src="/front-Gabi/assets-front/three-dots.svg" alt="">';
                        const divPostContent = document.createElement("div");  
                         divPostContent.classList.add("postContent");
                            const p = document.createElement("p"); 
                                 p.innerHTML = element.textPost;


            ul.appendChild(li);
             li.appendChild(divPostContainer);
             divPostContainer.appendChild(divAvatarIcon);
             divPostContainer.appendChild(divUserNameAndPostContainer);
             divUserNameAndPostContainer.appendChild(divHeaderPost);
             divHeaderPost.appendChild(divUserNameAndHour);
             divHeaderPost.appendChild(divbtnEditAndDeletPost);
             divbtnEditAndDeletPost.appendChild(buttonAddRemove);

             divHeaderPost.appendChild(divPostContent);
             divUserNameAndHour.appendChild(strong);
             divUserNameAndHour.appendChild(spanDot);
             divUserNameAndHour.appendChild(spanHour);
             divPostContent.appendChild(p);
        


    })


    user.friends.forEach((friend) => {
        friend.post.forEach((element)=>{


            const li = document.createElement("li");
            li.classList.add('post');
                const divPostContainer  = document.createElement("div");
                divPostContainer.classList.add("postContainer");
                    const divAvatarIcon = document.createElement("div");
                    divAvatarIcon.classList.add("avatarIcon");
                        divAvatarIcon.innerHTML = '<img src="../assets-front/user-profile.svg" alt="">';
                    
                    const divUserNameAndPostContainer = document.createElement("div");
                    divUserNameAndPostContainer.classList.add("userNameAndPostContainer");
                        const divHeaderPost = document.createElement("div");
        
                            const divUserNameAndHour = document.createElement("div"); 
                                const strong = document.createElement("strong"); 
                                    strong.innerHTML = friend.fullName;
                                const spanDot = document.createElement("span"); 
                                    spanDot.innerHTML = '·';
                                const spanHour = document.createElement("span"); 
                                    spanDot.innerHTML = '21h';  
                            const divbtnEditAndDeletPost = document.createElement("div");
                            divbtnEditAndDeletPost.classList.add("btnEditAndDeletPost");
                                const buttonAddRemove = document.createElement("button");
                                // buttonAddRemove.innerHTML = '<img src="/front-Gabi/assets-front/three-dots.svg" alt="">';
                        const divPostContent = document.createElement("div");  
                         divPostContent.classList.add("postContent");
                            const p = document.createElement("p"); 
                                 p.innerHTML = element.textPost;


            ul.appendChild(li);
             li.appendChild(divPostContainer);
             divPostContainer.appendChild(divAvatarIcon);
             divPostContainer.appendChild(divUserNameAndPostContainer);
             divUserNameAndPostContainer.appendChild(divHeaderPost);
             divHeaderPost.appendChild(divUserNameAndHour);
             divHeaderPost.appendChild(divbtnEditAndDeletPost);
             divbtnEditAndDeletPost.appendChild(buttonAddRemove);

             divHeaderPost.appendChild(divPostContent);
             divUserNameAndHour.appendChild(strong);
             divUserNameAndHour.appendChild(spanDot);
             divUserNameAndHour.appendChild(spanHour);
             divPostContent.appendChild(p);
        })


    })

    


}

renderFeed()