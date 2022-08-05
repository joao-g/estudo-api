## APIs 

* [API no Back-End](#API-no-Back-End)
* [Consumindo API com NodeJS](#Consumindo-API-com-NodeJS)
* [API no Front-End com Fetch](#API-no-Front-End-com-Fetch)
* [API no Front-End com Axios](#API-no-Front-End-com-Axios)

### O que é?

- **API** é uma ponte entre o front-end e o back-end, levando pedidos(chamadas) ao back-end, e entregando os pedidos de volta ao front-end(resposta).

- Pode ser também uma ponte que trafega dados entre sistemas que não se conversam (até com linguagens diferentes).

- Os dados são trafegados pelo formato **JSON**, utilizando como meio **REST** (Representational State Transfer, Transferência Representacional de Estado) ou **GraphQL** (é uma abstração ao protocolo HTTP).

### JSON

- **JSON** é uma formato de arquivo para troca de informações e dados entre sistemas e funciona com varias linguagens.

- Documentação: <https://www.json.org/json-en.html>

### Métodos HTTP

- <span style="color:#00BFFF">**GET**</span> a API **fornece informações**.

- <span style="color:#00CED1">**POST**</span> a API recebe informações que devem ou não ser **registradas**.

- <span style="color:#FF8C00">**DELETE**</span> a API recebe identificadores de registros que devem ser **apagados**.

- <span style="color:#00FA9A">**PUT**</span> a API recebe informações para **update** de **um ou mais** registros.

- <span style="color:#DAA520">**PATCH**</span> a API recebe informações para **update** de **um** registros.

### Insomnia

- **Insomnia** é um client quer permite a utilização de varios métodos HTTP.

- Documentação e download: <https://insomnia.rest/>

## API no Back-End

### Iniciando projeto em NodeJS

```bash
npm init -y
```

### Express

- Possui recursos fundamentais para criação de APIs para Web.  

- Utilizando o framework Express, documentação: <https://expressjs.com/pt-br/>

```bash
npm i express
```

### Criando server

- Utilização do express no NodeJS:

```nodejs
const express = require('express')

const app = express()

app.listen('3000')
```

- E no terminal digitamos:

```bash
node index.js
```

### GET

- No metodo/verbo GET, através do nosso codigo podemos fornecer algo para o navegador mostrar. Exemplo:

```nodejs
app.route('/').get( (req,res) => res.send("Ola") )
app.route('/sobre').get( (req,res) => res.send("Ola sobre") )
```

- Utilizando o método **.route** com o **.get** traçamos as rotas para nossa aplicação web, sendo elas a main <http://localhost:3000/> que exibirá a mensagem 'Ola' no navegador e <http://localhost:3000/sobre> que vai exibir a mensagem 'Ola sobre'.

### POST

- Antes de *receber algo do Insomnia* é necessario informar ao express que o que vamos receber sera um **JSON**, por isso utilizamos o metodo **.use** invocando o express com a propriedade **.json**.

- **middleware** é a ponte entre as requisições, toda as informações que entram e que saem da API são transformadas em JSON por ele.

- Utilizando o **Insomnia** para executar o metodo **.post** e enviar um **JSON** (req/requisição) com algum conteudo como nome por exemplo, para a API **receber** e reenviar (res) essa resposta com o **.body** que é o conteudo da requisição que são os dados em JSON.

- Codigo em NodeJS:

```nodejs
//middleware
app.use(express.json())

app.route('/').post( (req,res) => res.send(req.body) )
```

- POST do Insomnia:

```json
{
 "content": "Joao Victor Gali"
}
```

### PUT

- O PUT serve para editar informações, vamos receber uma informação para alterar o que ja estava.

- No **Insomnia** colocamos no metodo PUT e no JSON colocamos o nova informação que vai substituir a anterior.

```json
{
 "author": "Joao Victor"
}
```

- E novamente teremos que utilizar o middleware.

- No codigo colocamos que a variavel *author* vai receber o corpo da requisição(req) que são os novos dados em JSON e colocamos **.author** para não vir toda a estrutura JSON, e depois colocamos a resposta(res) que vai receber o novo conteudo de *author*.
- E também colocamos uma rota **.get** para verificarmos se realmente esta acontecendo alguma alteração.

```nodejs
//middleware
app.use(express.json())

let author = "Joao"

app.route('/').get( (req,res) => res.send(author))

app.route('/').put( (req,res) => {
    author = req.body.author
    res.send(author)
})
```

### DELETE

- DELETE é uma rota recebe identificadores para apagar algo do codigo.

- **.params** é todas as variaveis que vem na URL.

- No **Insomnia** utilizando o metodo DELETE e no campo de URL colocando um **:identificador** que pode ser um numero.

- Sendo assim o Insomnia manda esse numero que foi armazenado na variavel identificador que vem dentro da req (requisição) e dentro da requisição ela vem dentro do **.params** e podemos pegar ela através do **.identificador**.

```nodejs
app.route('/:identificador').delete( (req,res) => {
    res.send(req.params.identificador)
})
```

- E dentro deste codigo poderiamos colocar algo para poder apagar algo do codigo.

## Parâmetros nas requisições

- São formas de passar para o nosso codigo informações que não estão la. Os **params** são as informações e a **req** é a forma de requisitar algo para a API.

- Abaixo temos três principais formas.

```nodejs
//middleware
app.use(express.json())

// Primeira
app.route('/').get( (req, res) => res.send(req.query.name))

// Segunda
app.route('/:parametro').get( (req, res) => res.send(req.params.parametro))

// Terceira
app.route('/').post( (req, res) => res.send(req.body))
```

- Na **Primeira** forma conseguimos passar informações para o nosso código através das URLs, por exemplo, colocando **localhost:3000/?name=joao**, entretanto, só conseguimos passar informações para parametros que ja foram programados.

- Na **Segunda** forma também conseguimos passar informações através das URLs, por exemplo, colocando **localhost:3000/ola%20mundo**, neste caso, conseguimos passar para o nosso codigo qualquer informação digitada na URL.

- Na **Terceira** forma conseguimos passar parâmetros para a **requisição**, utilizando métodos/verbos como **POST, PUT ou PATCH** permite passarmos um *body* no formato *JSON*, e quando enviamos, conseguimos pegar essas informações e trabalhar elas.

### Body Params

- As informações não ficam armazenadas na URL, mas sim no corpo da requisição, e nele podemos passar dados no formato **JSON**.

- Só é possivel enviar informações através dos métodos/verbos HTTP **PATH, PUT e POST**.

- Toda vez que estamos recebendo algo pelo **body**, temos que usar *middleware*, que é uma função que transforma tudo que entra e tudo que sai da *API* em formato **JSON**. Abaixo temos a aplicação de *middleware* usando o **express**.

```nodejs
//middleware
app.use(express.json())
```

- Colocando **.nome** (res.send(req.body.nome)), coseguimos especificar/receber somente uma propriedade que queremos receber na nossa *API*.

```nodejs
//middleware
app.use(express.json())

app.route('/').post( (req, res) => {
    res.send(req.body.nome)
})
```

- Neste outro exemplo abaixo, conseguimos especificar mais de uma propriedade que queremos receber na *API*, e também utilizando um **Template strings**, veremos que a **API** esta retornando apenas os dados desejados e tratando eles.

```nodejs
//middleware
app.use(express.json())

app.route('/').post( (req, res) => {
    const {name, cidade} = req.body
    res.send(`Meu nome é ${name} e eu moro em ${cidade}`)
})
```

- E no **body** da requisição estamos enviando:

```json
{
 "name": "Joao",
 "cidade": "Sao paulo",
 "Hobbies": [
  "jogar",
  "ver animes"
 ]
}
```

### Route Params

- **Route Params** é a forma de enviar informações através da **rota**, ou seja, escrevendo algo na URL.

- No **Primeiro caso**, o que vir após a barra '/' vira uma variavel no codigo.

- No **Segundo caso**, acessando a rota localhost:3000/identidade/, tudo que for colocado depois da ultima barra '/' vira o valor da variavel 'nome'.

```nodejs

app.route('/').get((req,res) => res.send("digite algo na URL ou acesse a rota na URL (/identidade) e coloque (/seu nome aqui)"))

// Primeiro caso
app.route('/:variavel').get( (req,res) => res.send( req.params.variavel ) )

// Segundo caso
app.route('/identidade/:nome').get( (req,res) => res.send( req.params.nome ) )
```

### Query Params

- Com o **Query Params** conseguimos mandar parametros para dentro da URL, utilizando ele não precisamos passar uma variavel na rota, precisamos apenas colocar (localhost:3000?variavel=propriedade-da-variavel).

- E tudo quer vier após o '?' acaba se tornando uma variavel.

- Colocando o '&' conseguimos colocar outras variaveis (?variavel=propriedade-da-variavel&outraVariavel=propriedade).

```nodejs
app.route('/').get( (req,res) => res.send ( req.query ) )
```

- Utilizando a URL (localhost:3000/?nome=Joao%20Victor&cidade=Sao%20Paulo) temos como resultado o JSON:

```json
{
 "nome": "Joao Victor",
 "cidade": "Sao Paulo"
}
```

- Colando **.nome** depois do **.query**, conseguimos especificar a variavel que sera respondidade de volta na API.
- Neste caso ele esta tentando chamar o 'nome' que esta dentro de 'query'.

```nodejs
app.route('/').get( (req,res) => res.send ( req.query.nome ) )
```

- Neste outro exemplo abaixo, conseguimos colocar **Query Params** em uma rota especifica.
- E também conseguimos especificar a variavel

```nodejs
app.route('/').get( (req,res) => res.send ( req.query.nome ) )

app.route('/about/user').get( (req,res) => res.send ( req.query) )
```

- Colocando (localhost:3000/about/user?pais=brasil), vamos obter o **JSON**:

```json
{
 "pais": "brasil"
}
```

## Consumindo API com NodeJS

### API do GitHub

- Documentação: <https://docs.github.com/pt/rest>.
- URL padrão: <https://api.github.com>.

### Consumindo com o axios

- Para ir buscar informações de outras APIs sera necessario utilizar o **AXIOS**.

- Documentação: <https://axios-http.com/docs/intro>

- Para instalar:

```bash
npm install axios
```

- Para importar o axios dentro do JavaScript, utilize:

```nodejs
const axios = require('axios')
```

- No código abaixo, o **axios** utilizando o método HTTP **GET**, pega os dados da API do GitHub e esses dados vão para o ***result*** e utilizando o parâmetro **.data** nós conseguimos essas informações em **JSON**.

- O **axios** utiliza **promises**, ou seja, ele pode ter uma eventual conclusão (then) ou falha(catch) de uma operação assíncrona.

```nodejs
app.route('/').get( (req,res) => {

    axios.get('https://api.github.com/users/joao-g')
     .then(result => res.send(result.data))
     .catch(error => console.error(error))
})
```

- No codigo abaixo temos uma variação do codigo que pega apenas a imagem do avatar da API do GitHub.

 ```nodejs
app.route('/').get( (req,res) => {

    axios.get('https://api.github.com/users/joao-g')
     .then(result => res.send(`<img src="${result.data.avatar_url}" />`))
     .catch(error => console.error(error))
})
```

## API no Front-End com Fetch

- Documentação: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>

### Conhecendo o fetch

- O **API Fetch** utiliza interface JavaScript pra manipular recursos HTTP para trazer por exemplo, pedidos ou respostas.

- E também para os exemplos abaixo utilizaremos a API feita pela Jakeliny Gracielly que é instrutora do curso *trabalhando com APIs* da *Rocketseat*.
  - Link para o repositorio GitHub: <https://github.com/jakeliny/node-api-discover>
  - E dentro de uma pasta na maquina local utilizamos o comando de 'git clone (mais a chave SSH)' no terminal.

```bash
git clone (SSH key)
```

- Com o repositorio clonado, é só acessar a devida pasta do projeto na maquina local e colocar os comandos 'npm i' para instalar as dependencias e 'npm start' para iniciar o API.

```bash
npm install
npm start
```

- Deixe essa API rodando em uma aba do terminal, e crie outra pasta para o projeto que vai consumir esta API.

### GET (fetch)

- Criando um arquivo **.HTML** e um **.js**, para consumir a API.

- O primeiro argumento do fetch é sempre a URL e o segundo é o metodo HTTP, ou seja o **method**, por padrão ele ja vem determinado como **GET**.

- Para consumir os dados de uma API com o Fetch basta apenas colar:

```javascript
fetch(Url da API)
    .then(result => console.log(result))
    .catch(error => console.error(error))
```

- O **Fetch** trabalha com promises, e passando uma *URL* nele, ele ja busca o conteudo dela. Caso ele consiga buscar **.then** ele vai executar o codigo, caso dê erro na busca ele vai pro **.catch** e vai exibir alguma mensagem de erro no console do navegador.

```javascript
const url = "http://localhost:5500/api"

function getUsers() {
    fetch(url)
     .then(response => response.json())
     .then(data => renderApiResult.textContent = JSON.stringify(data))
     .catch(error => console.error(error))
}

getUsers()
```

- É possivel utilizar varios **.then**.

- O trecho de codigo 'renderApiResult.textContent = JSON.stringify(data)', corresponde a retornar os dados **data** na div de HTML com id **renderApiResult**, sendo que o **.textContent** aplica pelo JavaScript um conteudo na div.

- O método **JSON.stringify()** converte valores em javascript para uma String  JSON.
  - Documentação: <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify>

### GET com parametros (fetch)

- Utilizando parametros, conseguimos "selecionar" o conteudo que vamos pegar dentro **data**, passando **data.O_nome_da_variavel**.

- No trecho de codigo abaixo concatenamos a variavel *url* com o numero 1, para selecionar o usuario que vem da API **${url}/1**.

```javascript
function getUser() {
    fetch(`${url}/1`)
      .then( response => response.json() )
      .then( data => {
        userName.textContent = data.name
        userCity.textContent = data.city
        userAvatar.src = data.avatar
      })
      .catch(error => console.error(error))
}

getUser()
```

- Neste trecho aplicamos o conteudo que selecionamos de **data** em **id** de paragrafos e até **id** de imagens (nessa situação usamo o **.src** ao invés de textContent).

- lembrando que na URL da API colamos o 1 para selecionar o usuario <http://localhost:5500/api/1>.

### POST (fetch)

- Quando utilizamos o método HTTP **POST** significa que vamos passar as informações para inclusão de dados dentro da nossa API.

- O primeiro argumento do fetch é sempre a URL e o segundo é o metodo HTTP, ou seja o **method**, por padrão ele ja vem determinado como **GET**, com isso, temos que alterar para o **method**.
  - Neste segundo argumento também colocamos o **body**, onde o **Fetch** pega o que esta nele e envia pra URL da API.
  - Precisamos converter o que vai para o **body** em **JSON**, para isso utilizamos 'JSON.stringify()'.
  - E por ultimo temos que colocar os **headers**, que é um objeto que passamos o "Content-type".
  - Com tudo isso configurado, a nossa requisição ja esta pronta.

```javascript
fetch(url, {
  method: "POST",
  body: JSON.stringify(newUser)
  headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
```

- Neste trecho código utilizando o método POST conseguimos incluir mais um usuario/objeto **newUser** dentro da nossa API, e depois temos o retorno na página HTML.

- Alterando o id da concatenação da função criada anteriormente **GET com parametros**, conseguimos ver a imagem de avatar e as outras informações do novo usuario.

- O trecho de código '.then(response => response.json())', é responsavel por transformar a resposta da API em JSON.

```javascript
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

const newUser = { 
    name: "Olivia Zars",
    avatar: "https://picsum.photos/200/300",
    city: "Rio do Sul",
}

addUser(newUser)
```

### PUT (fetch)

- Utilizado quando vamos alterar alguma informção, tipo de avatar, nome ou cidade.

- Com o método **PUT** utilizamos o mesmo processo do método **POST**, exceto pela concatenção '`${url}/1`' que fazemos para escolher o usuario alterado.

- É importante se atentar ao código da **API**, pois nem sempre a identificação de usuario pode ser pela URL. E também a forma de sobrescrever os dados existentes, ou seja, como a API recebe os dados, geralmente existe uma documentação da propria API descrevendo cada rota dos métodos HTTP.

- O trecho de código '.then(response => response.json())', é responsavel por transformar a resposta da API em JSON.

- De acordo com o codigo da API o **data** é alterado la dentro.

```javascript
function updateUser (updatedUser) {
    fetch(`${url}/1`,{
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

const updatedUser = {
    name: "João Victor Gali",
    avatar: "https://avatars.githubusercontent.com/u/61668219?v=4",
    city: "São Paulo"
}

updateUser(updatedUser)
```

### DELETE (fetch)

- Com o método **DELETE**, conseguimos apagar os registros feitos.

- O trecho de código '.then(response => response.json())', é responsavel por transformar a resposta da API em JSON.

- De acordo com o codigo da API o **data** é alterado la dentro.

- No caso do **DELETE** não é necessario passar um **body**, passamos apenas os **headers**.

- Lembrando que o **DELETE** só vai funcionar caso a rota *DELETE* estaja programada dentro da API.

```javascript
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

deleteUser(4)
```

## API no Front-End com Axios

- Com o **Axios** é possivel também consumir APIs.

- Nos exemplos abaixo vamos utilizar o axios por **CDN** onde colocamos esse trecho de código na **head** do HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

- E também para os exemplos abaixo utilizaremos a API feita pela Jakeliny Gracielly que é instrutora do curso *trabalhando com APIs* da *Rocketseat*.
  - Link para o repositorio GitHub: <https://github.com/jakeliny/node-api-discover>

### Rodando API

- Como ja baixos a mesma API do projeto **API com Fetch**, apenas vamos iniciar com um 'npm start', isso dentro do devido repoisitorio que foi baixado, e vamos acessar o link 'http://localhost:5500/api'.

### GET (axios)

- Para utilizar o **Axios** com o método/verbo HTTP **GET** basta utilizar 'axios.get(url)'. Como o **Axios** é uma *promise*, junto a ele utilazamos o **.then** (então) e o **catch** (pegar).

```javascript
const url = "http://localhost:5500/api"

function getUsers() {
    axios.get(url)
     .then(response => {
        console.log(response.data)
     })
     .catch(error => console.error(error))
}

getUsers()
```

- Utilizando apenas o "response" ele traz "config", "status code", "headers", "data" e dentre outras coisas.
- Utilizando o "response.data" conseguimos obter somente as informações necessarias, que nesse caso é o *array* de *users* da API.

- No código abaixo, através da **DOM** conseguimos acessar o id 'apiResult' do HTML e alterar o conteudo dele através do Javascript.

- Para exibir o que esta no "response.data" precisamos tranformar o conteudo de JSON para *texto simples* usando a função 'JSON.stringify()'.

```javascript
const url = "http://localhost:5500/api"

function getUsers() {
    axios.get(url)
     .then(response => {
        apiResult.textContent = JSON.stringify(response.data)
     })
     .catch(error => console.error(error))
}

getUsers()
```

### POST (axios)

- Para utilizar o **Axios** com o método/verbo HTTP **POST** basta utilizar 'axios.post(url, (as informações a serem enviadas para a API))', ou seja, além de passar a url passamos as informações em formato de objeto, assim conseguimos fazer um **POST**.

```javascript
function addNewUser() {
   axios.post(url, newUser)
    .then(response => {
      console.log(response)
    })
    .catch(error => console.error(error))
}

const newUser = {
   name: "Olivia Zars",
   avatar: "https://i.picsum.photos/id/965/200/300",
   city: "Rio de Janeiro"
}

addNewUser(newUser)
```  

### GET com parametros (axios)

- Quandos aplicamos parametros ao método/verbo **GET** conseguimos por exemplo pegar somente um usuario ou uma informação especifica do usuario.

- Por meio de parametros colocados na url conseguimos "selecionar" o usuario cadastrado na API.

- Colocando "id" em tags HTML conseguimos exibir na pagina o que **GET** esta pegando.

```html
<body>
    <div id="apiResult"></div>

    <hr />

    <p id="userName"></p>
    <p id="userCity"></p>
    <p id="userID"></p>
    <img src="" alt="" id="userAvatar" />

</body>
```

```javascript
function getUser(id) {
   axios.get(`${url}/${id}`)
    .then(response => {
      userName.textContent = response.data.name
      userCity.textContent = response.data.city
      userID.textContent = response.data.id
      userAvatar.src = response.data.avatar
    })
    .catch(error => console.error(error))
}

getUser(3) // Com parametros
```

- Utilizando *template string* **`${}`** conseguimos concatenar a url com o id.

- Ao passarmos um numero em getUser(numero), conseguimos selecionar o usuario e com isso seus dados serão mostrados na pagina web.

- Acrescentando o nome da propriedades do objeto 'users', como **.name**,**.city**, **.id** e **.avatar**, conseguimos especificar os dados que queremos buscar, e nesse caso aplicamos o que buscamos e colocamos no HTML.

### PUT (axios)

- Quandos utilizamos o método/verbo **PUT** conseguimos alterar o conteudo ja existente na API, ou seja, ocorre uma substituição daquele dado.

- Ele sinaliza a API que os dados que estão vindo são de update(substituição).

```javascript
function updateUser(id, userUpdated) {
   axios.put(`${url}/${id}`, userUpdated)
    .then(response => console.log(response))
    .catch(error => console.error(error))
}

const userUpdated = {
   name: "Marcelo Calvis",
   avatar: "https://picsum.photos/200/300",
   city:"Recife"
}

updateUser(3, userUpdated) // edita as informações do usuario selecionado
```

- Utilizando *template string* **`${}`** conseguimos concatenar a url com o id, e aplicando um objeto após essa concatenação, conseguimos aplicar dados na API afim de substituilos.
  - Dentro deste objeto possui os novos dados.

- Alterando o numero dentro de 'updateUser(3, userUpdated)', conseguimos selecionar o usuario que queremos aplicar as modificações.

### DELETE (axios)

- Para o utilizarmos o método/verbo **DELETE** temos que especificar na url o queremos excluir.

```javascript
function deleteUser(id){
   axios.delete(`${url}/${id}`)
    .then(response => console.log(response))
    .catch(error => console.error(error))
}

deleteUser(2) // exclui o usuario determinado
```

- Utilizando *template string* **`${}`** conseguimos concatenar a url com o id, e assim conseguimos selecionar o id do usuario que queremos excluir através do numero colocado na chamada de função 'deleteUser(2)'.