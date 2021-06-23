# API de Games

Esta API é utilizada em uma loja de games.
##Endpoints
### GET /games
Esse endpoint é responsavel por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a lista de todos os games. 

Exemplo de resposta:
```
[
    {
        "id": 2,
        "title": "Warface",
        "price": 0,
        "year": 2013,
        "createdAt": "2021-06-21T14:22:10.000Z",
        "updatedAt": "2021-06-21T15:58:24.000Z"
    },
    {
        "id": 11,
        "title": "CS-GO",
        "price": 10,
        "year": 2011,
        "createdAt": "2021-06-23T12:49:01.000Z",
        "updatedAt": "2021-06-23T12:49:01.000Z"
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "Token inválido!"
}
```

### POST /auth
Esse endpoint é responsavel por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
	"email": "email@gmail.com",
	"password": "senha123"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API. 

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3YWduZXJAZW1haWwuY29tIiwiaWF0IjoxNjI0NDUzMTgwLCJleHAiOjE2MjQ2MjU5ODB9.YzZx9VS1rwbnrWNZFGjpZH8ImO3QjEGO4mgfWnNyO_Q"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:
```
{ "err": "Credenciais inválidas!" }
```
