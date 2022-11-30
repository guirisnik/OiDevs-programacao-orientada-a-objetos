 
export function btnAddRemoveFriends(userEmail,dataBase){

     const UserLocalStorage = window.localStorage.getItem('user').replaceAll('"','')
    const index = dataBase.findIndex(item => item.email == UserLocalStorage)
    const user = dataBase[index];

    const indexFriend = dataBase.findIndex(item => item.email == userEmail)
    const userFriend = dataBase[indexFriend];

    user.newFriendship(userFriend);

}