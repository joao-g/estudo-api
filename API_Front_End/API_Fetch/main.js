const url = "http://localhost:5500/api"

function getUsers() {
    fetch(url)
     .then( response => response.json() )
     .then( data => renderApiResult.textContent = JSON.stringify(data) )
     .catch(error => console.error(error))
}


function getUser() {
    fetch(`${url}/1`)                      // Alterando esse numero para dois
      .then( response => response.json() ) // podemos ver as informações do 
      .then( data => {                     // novo usuario. 
        userName.textContent = data.name
        userCity.textContent = data.city
        userAvatar.src = data.avatar
      })
      .catch(error => console.error(error))
}

function addUser(newUser) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
      .then(response => response.json())
      .then(data => alertApi.textContent = data)
      .catch(error => console.error(error))
}

function updateUser (updatedUser, id) {
    fetch(`${url}${id}`,{
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
      .then(response => response.json())
      .then(data => alertAPI.textContent = data)
      .catch(error => console.error(error))
}

function deleteUser(id){
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => alertAPI.textContent = data)
        .catch(error => console.error(error))
}

const newUser = { 
    name: "Olivia Zars",
    avatar: "https://picsum.photos/200/300",
    city: "Rio do Sul",
}

const updatedUser = {
    name: "João Victor Gali",
    avatar: "https://avatars.githubusercontent.com/u/61668219?v=4",
    city: "São Paulo"
}

deleteUser(4) // Os numeros dentro deste campo 
              // corresponde ao id que vai ser excluido
updateUser(updatedUser, 1) // alterando o numero, alteramos o id, 
                           // ou seja, selecionamos qual usuario vamos alterar
addUser(newUser) 
getUser()
getUsers()